import { NextApiRequest, NextApiResponse } from 'next/types';
import { movieApi } from '@/entities/movie/api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const documentID = req.query.documentID as string;

    const response = await movieApi.updateMovie(documentID, {watched: true});
    res.status(200).json({ data: response });
  } catch (error) {
   res.status(500).json({ error: 'Failed to update movie' });
  }
}
