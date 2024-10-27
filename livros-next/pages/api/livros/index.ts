// Importações necessárias
import { NextApiRequest, NextApiResponse } from 'next';
import { ControleLivros } from '../../../classes/controle/ControleLivros';

// Instanciando o controlador de livros
export const controleLivro = new ControleLivros();

// Função de tratamento das requisições HTTP
export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      // Responde com a lista de livros
      const livros = controleLivro.obterLivros();
      res.status(200).json(livros);
    } else if (req.method === 'POST') {
      // Captura os dados do livro fornecidos no corpo da requisição
      const livro = req.body;
      controleLivro.incluir(livro);
      
      // Responde com sucesso
      res.status(200).json({ message: 'Livro incluído com sucesso!' });
    } else {
      // Método não permitido
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    // Tratamento de erro interno do servidor
    res.status(500).json({ error: 'Internal Server Error' });
  }
};