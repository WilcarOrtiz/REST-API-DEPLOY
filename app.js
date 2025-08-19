import express, { json } from 'express'
import { createMovieRouter } from './routes/movies.js'
import { corsMiddleware } from './middleware/cors.js'

export const createApp = ({ movieModel }) => {
  const app = express()
  app.disable('x-powered-by')
  app.use(corsMiddleware())
  app.use(json())
  app.use('/movies', createMovieRouter({ movieModel }))

  return app
}

