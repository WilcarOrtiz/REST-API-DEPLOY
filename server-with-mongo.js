import { createApp } from './app.js'
import { movieModel } from './models/mongodb/movies.js'

createApp({ movieModel: movieModel })