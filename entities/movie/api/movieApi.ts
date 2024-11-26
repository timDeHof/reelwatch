import { databases } from '@/shared/lib/appwrite';
import { Query } from 'appwrite';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Movie, SearchResult, TMDBMovie } from './types';

class MovieApi {
  private readonly databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string;
  private readonly collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string;
  private readonly tmdbKey = process.env.NEXT_PUBLIC_TMDB_MOVIE_KEY;
  private readonly tmdbUrl = process.env.NEXT_PUBLIC_TMDB_URL;

  async getMovies(limit: number, offset: number = 0) {
    try {
      const response = await databases.listDocuments(
        this.databaseId,
        this.collectionId,
        [Query.limit(limit), Query.offset(offset)]
      );

      return {
        data: response,
        count: response.total
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async addMovie(movieId: number): Promise<{ id: number; message?: string }> {
    try {
      // First fetch movie details from TMDB
      const response = await axios.get<TMDBMovie>(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${this.tmdbKey}&language=en-US`
      );
      const movieData = response.data;

      // Check if movie already exists
      const existingMovie = await databases.listDocuments(
        this.databaseId,
        this.collectionId,
        [Query.equal('movie_id', movieData.id)]
      );

      if (existingMovie.documents.length > 0) {
        return {
          id: movieData.id,
          message: 'Movie already exists'
        };
      }

      // Add movie to database
      await databases.createDocument(
        this.databaseId,
        this.collectionId,
        uuidv4(),
        {
          movie_id: movieData.id,
          title: movieData.title,
          thumbnail_image: movieData.poster_path,
          popularity: movieData.popularity,
          release_date: movieData.release_date,
          vote_average: movieData.vote_average,
          watched: false,
          runtime: movieData.runtime,
        }
      );

      return { id: movieData.id };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateMovie(documentId: string, updates: Partial<Movie>) {
    try {
      const response = await databases.updateDocument(
        this.databaseId,
        this.collectionId,
        documentId,
        updates
      );
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async deleteMovie(documentId: string) {
    try {
      await databases.deleteDocument(
        this.databaseId,
        this.collectionId,
        documentId
      );
      return { success: true };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async searchMovies(query: string, currentPage: number): Promise<SearchResult> {
    try {
      const response = await axios.get(`${this.tmdbUrl}&page=${currentPage}&query=${query}`);
      const data = response.data;

      if (data.results.length > 0) {
        return {
          results: data.results,
          meta: {
            totalPages: data.total_pages,
            totalResults: data.total_results,
          }
        };
      }

      return {
        results: [],
        meta: { totalPages: 0, totalResults: 0 }
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: unknown): Error {
    console.error('MovieApi Error:', error);
    if (error instanceof Error) {
      return error;
    }
    return new Error('An unknown error occurred');
  }
}

export const movieApi = new MovieApi();
