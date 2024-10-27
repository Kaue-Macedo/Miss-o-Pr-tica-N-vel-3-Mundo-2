// Importações necessárias
import { NextApiRequest, NextApiResponse } from 'next';
import { controleLivro } from '.';

// Função de tratamento das requisições HTTP
export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'DELETE') {
      // Captura o código do livro fornecido na URL
      const { codigo } = req.query;
      controleLivro.excluir(Number(codigo));
      
      // Responde com sucesso
      res.status(200).json({ message: 'Livro excluído com sucesso!' });
    } else {
      // Método não permitido
      res.setHeader('Allow', ['DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    // Tratamento de erro interno do servidor
    res.status(500).json({ error: 'Internal Server Error' });
  }
};