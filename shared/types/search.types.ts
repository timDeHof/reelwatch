export type SearchResult = {
  results: Movies[];
  meta: SearchMeta;
};
type SearchMeta = {
  totalPages: number;
  totalResults: number;
};

export type Movies = {
  id: number;
  title: string;
  homepage: string;
  overview: string;
  poster_path: string;
  popularity: number;
  release_date: string;
  vote_average: number;
  watched: boolean;
  runtime: number;
  genres: genre[];
};

type genre = {
  id: number;
  name: string;
};
