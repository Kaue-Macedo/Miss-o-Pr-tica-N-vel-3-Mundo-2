import React, { useState } from 'react';
import { ControleLivros } from './controle/ControleLivros';
import { ControleEditora } from './controle/ControleEditora';
import { useNavigate } from 'react-router-dom';

const LivroDados = () => {
  const controleLivro = new ControleLivros();
  const controleEditora = new ControleEditora();

  // Definindo as opções das editoras
  const opcoes = controleEditora.getEditoras().map(editora => ({
    value: editora.codEditora,
    text: editora.nome
  }));

  // Definindo os estados do formulário
  const [titulo, setTitulo] = useState('');
  const [resumo, setResumo] = useState('');
  const [autores, setAutores] = useState('');
  const [codEditora, setCodEditora] = useState(opcoes[0].value);

  const navigate = useNavigate();

  // Método para tratar a mudança no combo de editoras
  const tratarCombo = (event) => {
    setCodEditora(Number(event.target.value));
  };

  // Método para incluir um novo livro
  const incluir = (event) => {
    event.preventDefault(); // Evita o comportamento padrão do formulário

    const novoLivro = {
      codigo: 0, // Código será atribuído no controlador
      codEditora,
      titulo,
      resumo,
      autores: autores.split('\n'), // Divide os autores por linha
    };

    controleLivro.incluir(novoLivro); // Inclui o livro no controlador
    navigate('/'); // Navega de volta para a lista de livros
  };

  return (
    <main>
      <h1>Cadastro de Livro</h1>
      <form onSubmit={incluir}>
        <div className="mb-3">
          <label htmlFor="titulo" className="form-label">Título</label>
          <input 
            type="text" 
            className="form-control" 
            id="titulo" 
            value={titulo} 
            onChange={(e) => setTitulo(e.target.value)} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="resumo" className="form-label">Resumo</label>
          <textarea 
            className="form-control" 
            id="resumo" 
            value={resumo} 
            onChange={(e) => setResumo(e.target.value)} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="autores" className="form-label">Autores (um por linha)</label>
          <textarea 
            className="form-control" 
            id="autores" 
            value={autores} 
            onChange={(e) => setAutores(e.target.value)} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="editoras" className="form-label">Editora</label>
          <select 
            className="form-select" 
            id="editoras" 
            value={codEditora} 
            onChange={tratarCombo}
          >
            {opcoes.map((opcao) => (
              <option key={opcao.value} value={opcao.value}>
                {opcao.text}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Cadastrar</button>
      </form>
    </main>
  );
};

export default LivroDados;