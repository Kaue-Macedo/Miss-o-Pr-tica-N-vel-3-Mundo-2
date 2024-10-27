import React from 'react';

const LinhaLivro = ({ livro, excluir }) => {
  return (
    <tr>
      <td>{livro.titulo}</td>
      <td>{livro.resumo}</td>
      <td>{livro.codEditora}</td>
      <td>{livro.autores.join(', ')}</td>
      <td>
        <button onClick={() => excluir(livro.codigo)} className="btn btn-danger">
          Excluir
        </button>
      </td>
    </tr>
  );
};

export default LinhaLivro;