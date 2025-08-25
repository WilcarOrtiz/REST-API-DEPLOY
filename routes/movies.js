import { Router } from 'express'
import { MovieController } from '../controller/movies.js'
import { cacheInit } from '../middleware/cache.js'

export const createMovieRouter = ({ movieModel }) => {
    const moviesRouter = Router()
    const movieController = new MovieController({ movieModel })

    moviesRouter.get('/', cacheInit, movieController.getAll)
    moviesRouter.get('/:id', cacheInit, movieController.getById)
    moviesRouter.post('/', movieController.create)
    moviesRouter.delete('/:id', movieController.delete)
    moviesRouter.patch('/:id', movieController.update)

    return moviesRouter
}



