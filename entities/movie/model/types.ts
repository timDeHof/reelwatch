// An interface named 'MovieType' is defined to describe the structure of the data for a movie item.
export interface MovieType {
  $collectionId: string; // A unique identifier for the collection of movies
  $databaseId: string; // A unique identifier for the database where the movie is stored
  createdAt: string; // The date and time that the movie was created
  $id: string; // A unique identifier for a particular movie
  updatedAt: string; // The date and time that the movie was last updated
  movie_id: number; // The numerical ID of the movie
  popularity: number; // A numerical value representing the popularity of the movie
  release_date: string; // The date on which the movie was released
  thumbnail_image: string; // The URL of the image associated with the movie
  title: string; // The title of the movie
  vote_average: string;
  runtime: number; // The average rating given to the movie by users
}
