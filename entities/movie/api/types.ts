export interface Movie {
  movie_id: number;
  title: string;
  thumbnail_image: string;
  popularity: number;
  release_date: string;
  vote_average: number;
  watched: boolean;
  runtime: number;
}

export interface TMDBMovie {
  id: number;
  title: string;
  poster_path: string;
  popularity: number;
  release_date: string;
  vote_average: number;
  runtime: number;
}

export interface SearchResult {
  results: TMDBMovie[];
  meta: {
    totalPages: number;
    totalResults: number;
  };
}