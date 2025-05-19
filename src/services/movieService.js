import { findAllMovies, findMovieById } from "../data/movieData.js";

export const getMovies = async (page, pageSize, awarded, language, tomatoes) => {
    return await findAllMovies(page, pageSize, awarded, language, tomatoes);
}

export const getMovieById = async (id) => {
    return await findMovieById(id);
}