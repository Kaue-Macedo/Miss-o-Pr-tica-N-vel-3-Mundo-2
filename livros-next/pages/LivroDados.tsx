// componentes/LivroDados.tsx

import styles from '../styles/Home.module.css'; // Importação dos estilos
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Importação do hook useRouter
import Menu from '../componentes/Menu'; // Importação do componente Menu
import Head from 'next/head';
import { Livro } from '../classes/modelo/Livro'; // Importação da classe Livro
import { ControleEditora } from '../classes/controle/ControleEditora'; // Importação da classe ControleEditora

const controleEditora = new ControleEditora(); // Instância de ControleEditora
const baseURL: string = 'http://localhost:3000/api/livros'; // URL base da API

// Função para incluir livro
const incluirLivro = async (livro: Livro) => {
  const resposta = await fetch(baseURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(livro),
  });
  return resposta.ok; // Retorna o campo ok da resposta
};

const LivroDados: React.FC = () => {
  const [titulo, setTitulo] = useState<string>(''); // Estado para o título
  const [resumo, setResumo] = useState<string>(''); // Estado para o resumo
  const [autores, setAutores] = useState<string>(''); // Estado para os autores
  const [codEditora, setCodEditora] = useState<number>(0); // Estado para a editora
  const [opcoes, setOpcoes] = useState<Array<{ value: number; text: string }>>([]); // Opções de editoras

  const router = useRouter(); // Hook para navegação

  // Hook useEffect para obter as editoras
  useEffect(() => {
    const editoras = controleEditora.getEditoras().map((editora) => ({
      value: editora.codEditora,
      text: editora.nome,
    }));
    setOpcoes(editoras); // Atualiza as opções
  }, []);

  // Método para tratar a mudança na seleção de editoras
  const tratarCombo = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCodEditora(Number(event.target.value)); // Atualiza o código da editora
  };

  // Método para incluir o livro
  const incluir = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evita o comportamento padrão do formulário
    const livro: Livro = {
      codigo: 0,
      titulo,
      resumo,
      autores: autores.split('\n'), // Separa os autores por linha
      codEditora,
    };

    const sucesso = await incluirLivro(livro); // Chama a função para incluir o livro
    if (sucesso) {
      router.push('/LivroLista'); // Navega para a página LivroLista
    }
  };

  // Retorno do componente LivroDados
  return (
    <div className={styles.container}>
      <Head>
        <title>Loja Next - Cadastro de Livro</title>
      </Head>
      <Menu />
      <main className={styles.main}>
        <h1 className={styles.title}>Cadastro de Livro</h1>
        <form onSubmit={incluir}>
          <div className="mb-3">
            <label htmlFor="titulo" className="form-label">Título</label>
            <input
              type="text"
              className="form-control"
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)} // Atualiza o título
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="resumo" className="form-label">Resumo</label>
            <textarea
              className="form-control"
              id="resumo"
              value={resumo}
              onChange={(e) => setResumo(e.target.value)} // Atualiza o resumo
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="autores" className="form-label">Autores (um por linha)</label>
            <textarea
              className="form-control"
              id="autores"
              value={autores}
              onChange={(e) => setAutores(e.target.value)} // Atualiza os autores
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="editoras" className="form-label">Editora</label>
            <select
              className="form-select"
              id="editoras"
              value={codEditora}
              onChange={tratarCombo} // Trata a mudança na seleção
            >
              {opcoes.map((opcao) => (
                <option key={opcao.value} value={opcao.value}>
                  {opcao.text}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Incluir Livro</button>
        </form>
      </main>
    </div>
  );
};

export default LivroDados; // Exportação do componente