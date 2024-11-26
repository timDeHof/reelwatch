import { NextApiRequest, NextApiResponse } from 'next/types';
import { movieApi } from '@/entities/movie/api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const limit: number = parseInt(req.query.limit as string);
    const offset: number = parseInt(req.query.offset as string) || 0;

    const response = await movieApi.getMovies(limit, offset);
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
}
