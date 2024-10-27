// Importações necessárias
import { NextApiRequest, NextApiResponse } from 'next';
import { ControleEditora } from '../../../classes/controle/ControleEditora';

// Instanciando o controlador de editoras
export const controleEditora = new ControleEditora();

// Função de tratamento das requisições HTTP
export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      // Responder com a lista de editoras
      const editoras = controleEditora.getEditoras();
      res.status(200).json(editoras);
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