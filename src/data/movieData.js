import { getDb } from "./connection.js";
import { ObjectId } from "mongodb";

export async function findAllMovies(page, pageSize, awarded, language, tomatoes) {
    const db = getDb();
    const skip = (page - 1) * pageSize;
    let movies = page && pageSize ? (
        await db.collection("movies")
            .find()
            .skip(skip)
            .limit(pageSize)
            .toArray()
    ) : (
        await db.collection("movies").find().toArray()
    );

    if (awarded != undefined) {
        movies = awarded ? movies.filter(m => m.awards?.wins > 0) : movies.filter(m => m.awards?.wins == 0)
    }

    if (language) {
        movies = movies.filter(m => {
            if (m.languages) {
                return m.languages.includes(language)
            }
        })
    }
    console.log("tomatoes", tomatoes)
    if (tomatoes) {
        console.log("tomatoes")
        movies = movies.filter(m => m.tomatoes?.fresh != undefined)
        movies = movies.sort((a, b) => b.tomatoes.fresh - a.tomatoes.fresh)
    }

    return movies
}

export async function findMovieById(id) {
    const db = getDb();
    const movie = await db.collection("movies").findOne({ _id: new ObjectId(id) });
    return movie;
}