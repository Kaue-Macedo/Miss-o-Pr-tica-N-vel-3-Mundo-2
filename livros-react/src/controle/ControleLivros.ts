import { Livro } from "../modelo/Livro";

const livros: Array<Livro> = [
  {
    codigo: 1,
    codEditora: 1,
    titulo: "O Senhor dos Anéis",
    resumo: "Uma história épica na Terra Média.",
    autores: ["J.R.R. Tolkien"],
  },
  {
    codigo: 2,
    codEditora: 2,
    titulo: "1984",
    resumo: "Uma distopia sobre um regime totalitário.",
    autores: ["George Orwell"],
  },
  {
    codigo: 3,
    codEditora: 3,
    titulo: "Dom Quixote",
    resumo: "As aventuras de um cavaleiro errante.",
    autores: ["Miguel de Cervantes"],
  },
];

export class ControleLivros {
  // Retorna o vetor completo de livros
  obterLivros(): Array<Livro> {
    return livros;
  }

  // Inclui um novo livro no vetor, com código incrementado
  incluir(livro: Livro): void {
    const maiorCodigo = livros.length > 0 
      ? Math.max(...livros.map((livro) => livro.codigo)) 
      : 0;
    livro.codigo = maiorCodigo + 1;
    livros.push(livro);
  }

  // Exclui o livro com o código fornecido
  excluir(codigo: number): void {
    const indice = livros.findIndex((livro) => livro.codigo === codigo);
    if (indice !== -1) {
      livros.splice(indice, 1);
    }
  }
}