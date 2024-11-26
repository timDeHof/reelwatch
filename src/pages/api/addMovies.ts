import type { NextApiRequest, NextApiResponse } from 'next';
import { movieApi } from '@/entities/movie/api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const movieID = parseInt(req.query.movieID as string);

    const response = await movieApi.addMovie(movieID);
    if (response.message === 'Movie already exists') {
      res.status(409).json(response)
    }
   res.status(200).json(response);

  } catch (e) {
    res.status(500).json({ error: 'Failed to add movie' });
  }
}
