export const Routes = {
  home: '/',
  watchList: '/watchlist',
  login: '/login',
  register: '/register',
  search: '/search',
};

export const TMDB_URL = `https://api.themoviedb.org/3/search/movie?&api_key=${process.env.NEXT_PUBLIC_TMDB_MOVIE_KEY}&include_adult=false&language=en-US`;

export const IMG_URL = 'https://image.tmdb.org/t/p/original';
