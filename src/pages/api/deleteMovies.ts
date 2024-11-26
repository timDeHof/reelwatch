import { NextApiRequest, NextApiResponse } from 'next/types';
import { movieApi } from '@/entities/movie/api';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const documentID = req.query.documentID as string;

     await movieApi.deleteMovie(documentID);
    res.status(200).json({ data: 'success' });
  } catch (e) {
    res.status(500).json({ error: 'Failed to delete movie' });
  }
}
