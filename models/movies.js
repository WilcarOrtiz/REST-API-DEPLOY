import { randomUUID } from 'node:crypto'
import movies from '../movies.json' with { type: 'json' }

export class movieModel {
  static async getAll({ genre }) {
    if (genre)
      movies.filter((movie) =>
        movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase()),
      )
    return movies
  }

  static async getById({ id }) {
    const movie = movies.find((movie) => movie.id === id)
    return movie
  }

  static async create(input) {
    const newMovie = {
      id: randomUUID(),
      ...input
    }
    movies.push(newMovie)
    return newMovie
  }

  static async delete({ id }) {
    const movieID = movies.findIndex((movie) => movie.id === id)
    if (movieID === -1) return false
    movies.splice(movieID, 1)
    return true
  }

  static async update({ id, input }) {
    const movieID = movies.findIndex((movie) => movie.id === id)
    if (movieID === -1) return false
    movies[movieID] = {
      ...movies[movieID],
      ...input,
    }
    return movies[movieID]
  }
}
