// Importações necessárias
import { NextApiRequest, NextApiResponse } from 'next';
import { controleEditora } from '.';

// Função de tratamento das requisições HTTP
export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      // Recuperando o código da editora a partir da URL
      const { codEditora } = req.query;
      const nomeEditora = controleEditora.getNomeEditora(Number(codEditora));

      if (nomeEditora) {
        // Responder com status 200 e o nome da editora em JSON
        res.status(200).json({ nome: nomeEditora });
      } else {
        // Responder com status 404 se a editora não for encontrada
        res.status(404).json({ error: 'Editora not found' });
      }
    } else {
      // Responder com status 405 se o método não for permitido
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    // Responder com status 500 se ocorrer uma exceção
    res.status(500).json({ error: 'Internal Server Error' });
  }
};