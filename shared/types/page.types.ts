type PageMeta = {
  totalMovies: number;
  postPerPage: number;
  currentPage: number;
  handleNextPage: () => void;
  nextOffset: number;
  handlePreviousPage: () => void;
};

export type Page<T> = {
  items: Array<T>;
  meta: PageMeta;
};
