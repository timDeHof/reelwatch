import type { NextApiRequest, NextApiResponse } from "next";
import { client, databases } from "../../lib/appwrite";
import { v4 as uuidv4 } from "uuid";
import { Query } from "appwrite";
type Data = {
  data?: any;
  id?: number;
};
export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const imdbID = req.query.imdbID;

    const response = await fetch(
      `https://api.themoviedb.org/3/find/${imdbID}?api_key=${process.env.NEXT_PUBLIC_TMDB_MOVIE_KEY}&language=en-US&external_source=imdb_id`,
    );
    const data = await response.json();
    if (data.movie_results.length > 0) {
      const id = data.movie_results[0].id;
      const item = data.movie_results[0];
      console.log("movie_results's id: ", id);
      const movieInDatabase = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string,
        [Query.equal("movie_id", id)],
      );

      if (movieInDatabase.documents.length > 0) {
        // there are movies present in the database;
        return res.status(409).json({ data: "Movie already exists", id });
      } else {
        // add the movie to the database
        await databases.createDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
          process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string,
          uuidv4(),
          {
            movie_id: id,
            title: item.title,
            thumbnail_image: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
            popularity: item.popularity,
            release_date: item.release_date,
            vote_average: item.vote_average,
          },
        );

        return res.status(200).json({ id });
      }
    } else {
      console.log("it is not a movie");
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ data: e });
  }
};
