import React, { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { MovieType } from '@/entities/movie/model/types';
import { useAtomValue } from 'jotai';

import noMoviesImage from '@/assets/no-movies-Icon.png';
import { isLoggedInAtom } from '@/entities/user/model/store';
import Layout from '@/shared/ui/layout';
import Pagination from '@/widgets/pagination';
import WatchlistItem from '@/widgets/watchlist-item';

import { Routes } from '@/shared/config/routes';

const Watchlist: NextPage = React.memo(() => {
  // Declare necessary state variables for handling offsets and movies.
  const [offset, setOffset] = useState(0);
  const [pageLimit] = useState(8);
  const [totalMovies, setTotalMovies] = useState(0);
  const [movies, setMovies] = useState([]);
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  // Define an asynchronous function to fetch the movies data using an api endpoint.
  const fetchMovies = async (
    limit: number | undefined,
    offset: number | undefined,
  ) => {
    const response = await fetch(
      `/api/getMovies?limit=${limit}&offset=${offset}`,
    );
    const data = await response.json();
    setMovies(data?.data?.documents || []);
    setTotalMovies(data?.count || 0);
  };
  // Define a function to handle deleting a movie item.
  const handleDeleteMovie = useCallback(
    async (movie: MovieType) => {
      console.log('movie to be deleted:', movie);
      // Send a request to delete the movie by calling the corresponding api endpoint.
      const response = await fetch(`/api/deleteMovies?documentID=${movie.$id}`);
      // If the response status is successful, fetch the updated movie list.
      if (response.status === 200) {
        fetchMovies(pageLimit, offset);
      }
    },
    [pageLimit, offset],
  );

  // Implement the 'useEffect' hook to fetch the movies data after the component mounts.
  useEffect(() => {
    fetchMovies(pageLimit, offset);
  }, [pageLimit, offset]);
  // Define functions to handle the next and previous pagination events.
  const handleNextPage = useCallback(() => {
    setOffset((prevOffset) => prevOffset + pageLimit);
  }, [pageLimit]);

  const handlePreviousPage = useCallback(() => {
    if (offset > 0) {
      setOffset((prevOffset) => {
        return prevOffset - pageLimit;
      });
    }
  }, [offset, pageLimit]);

  if (!isLoggedIn) {
    return (
      <Layout>
        <div className="h-screen">
          <p>
            Please{' '}
            <Link
              className="underline cursor-pointer text-sky-800 underline-offset-4 hover:text-rose-900"
              href={Routes.login}
            >
              login
            </Link>{' '}
            to view the watchlist{' '}
          </p>
        </div>
      </Layout>
    );
  }
  // Render JSX based on conditional logic to display when there are no movies in the Watchlist.
  return (
    <Layout>
      {movies.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-4 text-xl text-gray-300 opacity-50">
          <p className="">Your watchlist looks empty.</p>
          <Image src={noMoviesImage} alt="no movies icon"></Image>
          <p>
            {' '}
            Head over to{' '}
            <Link
              className="underline cursor-pointer text-sky-800 underline-offset-4 hover:text-rose-900"
              href={'/search'}
            >
              {' '}
              Search for Movies{' '}
            </Link>{' '}
          </p>
        </div>
      ) : (
        <>
          {/* Render JSX to display the list of movies */}
          <section className="pb-4 text-gray-600">
            <div className="grid grid-cols-1 gap-4 my-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-4">
              {movies.map((movie: MovieType) => {
                return (
                  <WatchlistItem
                    key={movie.$id}
                    handleDeleteMovie={handleDeleteMovie}
                    movie={movie}
                  ></WatchlistItem>
                );
              })}
            </div>
          </section>
          {/* Render JSX Component to display the pagination controls */}
          <Pagination
            key={offset}
            totalMovies={totalMovies}
            postPerPage={pageLimit}
            nextOffset={offset + pageLimit}
            currentPage={Math.floor(offset / pageLimit) + 1}
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
          />
        </>
      )}
    </Layout>
  );
});

export default Watchlist;
