import { movieModel } from '../models/movies.js'
import { validateMovie, validateMoviePartial } from '../schema/movie.js'

export class MovieController {

    static async getAll(req, res) {
        const { genre } = req.query
        const movies = await movieModel.getAll({ genre })
        res.json(movies)
    }

    static async getById(req, res) {
        const { id } = req.params
        console.log(id)
        const movie = await movieModel.getById({ id })
        if (movie) return res.json({ movie })
        res.status(404).json({ message: 'Movide Not Found' })
    }

    static async create(req, res) {
        const result = validateMovie(req.body)
        if (result.error)
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        const newMovie = await movieModel.create({ input: result.data })
        res.status(201).json(newMovie)
    }

    static async delete(req, res) {
        const { id } = req.params
        const result = await movieModel.delete({ id })
        if (result === false) return res.status(404).json({ success: false, message: 'Not found' })
        return res.json({ success: result, message: 'Movie Deleted' })
    }

    static async update(req, res) {
        const result = validateMoviePartial(req.body)
        if (result.error) return res.status(400).json({ error: JSON.parse(result.error.message) })

        const { id } = req.params
        const updateMovie = await movieModel.update({ id, input: result.data })
        if (updateMovie === false) return res.status(404).json({ message: 'Not found' })

        return res.json(updateMovie)
    }

}