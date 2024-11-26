// Import the required modules that are needed for displaying the movie list and pagination.
import React, { memo, useEffect, useState } from 'react';
import { Movies } from '@/shared/types/search.types';
import axios from 'axios';

import Layout from '@/shared/ui/layout';
import MovieCard from '@/widgets/movie-card';

const API_URL = `https://api.themoviedb.org/3/movie/popular?&api_key=${process.env.NEXT_PUBLIC_TMDB_MOVIE_KEY}&include_adult=false&language=en-US&page=1`;

// Define the Home component as a functional React component with NextJS's 'NextPage' type.
const Home = () => {
  const [popularMovies, setPopularMovies] = useState<Movies[]>([]);
  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios(API_URL);
      const recentMovies = await response.data.results.slice(-4);
      setPopularMovies(recentMovies);
    };

    fetchMovies();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col items-center flex-1 w-full min-h-screen text-center lg:px-20">
        <h1 className="text-4xl font-bold lg:text-6xl">Welcome to ReelWatch</h1>
        <p className="my-3 text-2xl">
          Keep track of your favorite movies and discover new ones.
        </p>
        <div className="grid gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-4">
          {popularMovies.map((movie: Movies) => (
            <MemoizedMovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

const MemoizedMovieCard = memo(MovieCard);

export default Home;
