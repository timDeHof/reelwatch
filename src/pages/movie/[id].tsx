import Image from 'next/image';
import { useRouter } from 'next/router';
import { Movies } from '@/shared/types/search.types';
import axios from 'axios';

import Button from '@/shared/ui/button';
import Layout from '@/shared/ui/layout';

interface MovieProps {
  movie: Movies;
}
const Movie = (props: { movie: Movies }) => {
  const router = useRouter();
  const { movie } = props;

  const handleAddMovie = async () => {
    try {
      const response = await fetch(`/api/addMovies?movieID=${movie.id}`);
      const data = await response.json();
      if (response.status === 200 && data.id) {
        console.log(
          'Added the movie succesfully, redirecting to the movie page',
        );
        return router.push(`/search`);
      }
      if (response.status === 409 && data.id) {
        console.log('Movie already exists, redirecting to the movie page');
        return router.push(`/search`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout>
        <div className="flex flex-col items-center h-screen space-y-8 lg:flex-row lg:items-start lg:space-x-8 lg:space-y-0">
          <Image
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt={movie.title}
            width={320}
            height={460}
            className="w-2/3 rounded-md lg:w-1/4"
          />
          <div className="flex flex-col space-y-12 justify-items-start">
            <div className="flex flex-col items-center justify-between space-y-2 lg:items-start lg:space-y-4">
              <h1 className="text-2xl font-bold text-center lg:text-left">
                {' '}
                {movie.title}{' '}
              </h1>
              <div className="flex items-center pr-2 space-x-2 text-sm shrink">
                {movie.genres.map((genre) => {
                  return (
                    <div
                      key={genre.name}
                      className="px-2 py-1 text-green-700 bg-green-200 rounded whitespace-nowrap"
                    >
                      <p> {genre.name} </p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="text-center md:text-justify">
              <p> {movie.overview} </p>
            </div>
            <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
              <a
                rel="preconnect"
                href={movie.homepage}
                target="_blank"
                className="flex items-center p-2 px-5 space-x-2 text-lg text-white bg-black rounded-lg "
              >
                <svg
                  className="size-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                </svg>
                <span>Movie Homepage</span>
              </a>
              <Button onClick={handleAddMovie} text="Add Movie" />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export async function getServerSideProps(context: {
  query: { id: string };
}): Promise<{ props: MovieProps }> {
  const { id } = context.query;
  try {
    const response = await axios(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_MOVIE_KEY}&language=en-US`,
    );

    const data = await response.data;
    return {
      props: {
        movie: data,
      },
    };
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch movie data');
  }
}

export default Movie;
