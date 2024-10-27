// componentes/LinhaLivro.tsx

import React from 'react';
import { Livro } from '../classes/modelo/Livro'; // Ajuste o caminho se necessário
import { ControleEditora } from '../classes/controle/ControleEditora';

// Instância de ControleEditora para reutilização
const controleEditora = new ControleEditora();

// Definição da interface LinhaLivroProps
interface LinhaLivroProps {
  livro: Livro;
  excluir: (codigo: number) => void;
}

// Definição do componente LinhaLivro
export const LinhaLivro: React.FC<LinhaLivroProps> = (props) => {
  const { livro, excluir } = props;

  // Obtém o nome da editora utilizando o controlador
  const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);

  return (
    <tr>
      <td>{livro.titulo}</td>
      <td>{livro.resumo}</td>
      <td>{nomeEditora}</td>
      <td>
        <ul>
          {livro.autores.map((autor, index) => (
            <li key={index}>{autor}</li>
          ))}
        </ul>
      </td>
      <td>
        <button className="btn btn-danger" onClick={() => excluir(livro.codigo)}>
          Excluir
        </button>
      </td>
    </tr>
  );
};

export default LinhaLivro;