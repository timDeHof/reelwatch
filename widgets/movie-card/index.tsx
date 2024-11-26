import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useAppwrite } from '@/app/providers/appwriteProvider';
import { WatchButton } from '@/shared/ui/button';

type MovieCardProps = {
  movie: {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    runtime: number;
  };
};

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const router = useRouter();
  const { isLoggedIn } = useAppwrite();
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
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex h-full max-h-[675px] flex-col">
      <Link className="flex-1" rel="preconnect" href={`/movie/${movie.id}`}>
        <div className="grid max-w-xs grid-cols-1 overflow-hidden duration-300 ease-in-out rounded shadow-lg hover:scale-105">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={500}
            height={460}
          />
          <div className="col-end-auto p-2 space-y-3">
            <p className="text-sm font-bold">{movie.title}</p>
            <p
              className={
                isLoggedIn
                  ? 'line-clamp-3 text-xs text-gray-600'
                  : 'line-clamp-3 text-sm text-gray-600'
              }
            >
              {movie.overview.split('. ', 1) + '.'}
            </p>
            {isLoggedIn && (
              <div className="flex flex-col content-end lg:flex-row lg:justify-between">
                <span className="flex items-center justify-center px-2 text-xs font-semibold text-gray-700 bg-gray-200 rounded-lg">
                  {movie.release_date}
                </span>
                <WatchButton onClick={handleAddMovie} text="watchlist" />
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
