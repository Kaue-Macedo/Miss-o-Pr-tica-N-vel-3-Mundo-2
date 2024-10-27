import React, { useState, useEffect } from "react";
import { ControleLivros } from "./controle/ControleLivros";
import { ControleEditora } from "./controle/ControleEditora";

// Instanciando os controladores de livros e editoras
const controleLivro = new ControleLivros();
const controleEditora = new ControleEditora();

// Componente auxiliar LinhaLivro
const LinhaLivro = (props) => {
  const { livro, excluir } = props;

  // Obtém o nome da editora usando o método getNomeEditora
  const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);

  return (
    <tr>
      <td>
        <strong>{livro.titulo}</strong>
        <br />
        <button
          className="btn btn-danger btn-sm mt-2"
          onClick={() => excluir(livro.codigo)}
        >
          Excluir
        </button>
      </td>
      <td>{nomeEditora}</td>
      <td>{livro.resumo}</td>
      <td>
        <ul>
          {livro.autores.map((autor, index) => (
            <li key={index}>{autor}</li>
          ))}
        </ul>
      </td>
    </tr>
  );
};

// Componente principal LivroLista
const LivroLista = () => {
  // Definindo estados: livros (vetor) e carregado (booleano)
  const [livros, setLivros] = useState([]);
  const [carregado, setCarregado] = useState(false);

  // Hook useEffect para carregar os livros ao inicializar
  useEffect(() => {
    if (!carregado) {
      const livrosObtidos = controleLivro.obterLivros();
      setLivros(livrosObtidos);
      setCarregado(true);
    }
  }, [carregado]);

  // Método excluir: remove um livro e força o redesenho da página
  const excluir = (codigo) => {
    controleLivro.excluir(codigo);
    setCarregado(false); // Força a recarga dos livros
  };

  // Retorno do componente
  return (
    <main className="container">
      <h1 className="my-4">Lista de Livros</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Título</th>
            <th>Editora</th>
            <th>Resumo</th>
            <th>Autores</th>
          </tr>
        </thead>
        <tbody>
          {livros.map((livro) => (
            <LinhaLivro
              key={livro.codigo}
              livro={livro}
              excluir={excluir}
            />
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default LivroLista;