// LivroLista.tsx

import { useEffect, useState } from 'react';
import LinhaLivro from '../componentes/LinhaLivro';
import { Livro } from '../classes/modelo/Livro'; // Uso da exportação nomeada
import Menu from '../componentes/Menu';
import Head from 'next/head';
import styles from '../styles/Home.module.css'; // Importação dos estilos

const baseURL: string = 'http://localhost:3000/api/livros'; // URL base da API

// Função para obter livros
const obterLivros = async (): Promise<Livro[]> => {
  const resposta = await fetch(baseURL);
  if (!resposta.ok) throw new Error('Erro ao obter livros');
  return resposta.json();
};

// Função para excluir livro
const excluirLivro = async (codigo: number): Promise<boolean> => {
  const resposta = await fetch(`${baseURL}/${codigo}`, { method: 'DELETE' });
  return resposta.ok;
};

// Definição do componente LivroLista
const LivroLista: React.FC = () => {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [carregado, setCarregado] = useState(false);

  // Hook useEffect para obter livros e atualizar o estado
  useEffect(() => {
    if (!carregado) {
      obterLivros()
        .then(setLivros)
        .finally(() => setCarregado(true));
    }
  }, [carregado]);

  // Função para lidar com a exclusão e recarregar a lista
  const excluir = (codigo: number) => {
    excluirLivro(codigo).then((ok) => {
      if (ok) setCarregado(false); // Força a recarga dos livros
    });
  };

  // Retorno do componente LivroLista
  return (
    <div className={styles.container}>
      <Head>
        <title>Loja Next - Livros</title>
        <meta name="description" content="Lista de livros da loja" />
      </Head>

      <Menu />

      <main className={styles.main}>
        <h1 className={styles.title}>Lista de Livros</h1>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Título</th>
              <th>Resumo</th>
              <th>Autores</th>
              <th>Editora</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {livros.map((livro) => (
              <LinhaLivro
                key={livro.codigo}
                livro={livro}
                excluir={() => excluir(livro.codigo)}
              />
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default LivroLista;