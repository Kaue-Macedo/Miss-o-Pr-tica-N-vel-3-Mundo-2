import { Editora } from "../modelo/Editora";

const editoras: Array<Editora> = [
  { codEditora: 1, nome: "Editora Moderna" },
  { codEditora: 2, nome: "Editora Atlas" },
  { codEditora: 3, nome: "Editora Saraiva" },
];

export class ControleEditora {
  // Retorna o vetor completo de editoras
  getEditoras(): Array<Editora> {
    return editoras;
  }

  // Retorna o nome da editora correspondente ao codEditora fornecido
  getNomeEditora(codEditora: number): string {
    const resultado = editoras.filter((editora) => editora.codEditora === codEditora);
    return resultado.length > 0 ? resultado[0].nome : "Editora não encontrada";
  }
}
