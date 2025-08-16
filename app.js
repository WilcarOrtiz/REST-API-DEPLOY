import express, { json } from 'express'
import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middleware/cors.js'

const app = express()
app.disable('x-powered-by')
app.use(corsMiddleware())
app.use(json())

app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 1324
app.listen(PORT, () => {
  console.log(`server listening in http://localhost:${PORT}`)
})
