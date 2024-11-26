import type { NextApiRequest, NextApiResponse } from 'next';
import { movieApi } from '@/entities/movie/api';
import { SearchResult } from '@/entities/movie/api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchResult>,
) {
  try {
    const query = req.query.query as string;
    const currentPage = parseInt(req.query.currentPage as string);

    const response = await movieApi.searchMovies(query, currentPage);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      results: [],
      meta: { totalPages: 0, totalResults: 0 },
    });
  }
}
