const express = require('express')
const crypto = require('node:crypto')
const movies = require('./movies.json')
const {validateMovie, validateMoviePartial} = require('./schema/movie')
const cors = require('cors')
const app = express()
app.use(cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = [
      'http://localhost:8080',
      'http://localhost:1234',
      'https://movies.com',
      'https://midu.dev',
      'http://localhost:8080'
    ]

    if (ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
}))
app.use(express.json())
app.disable('x-powered-by')


app.get('/movies', (req, res) => {
    const { genre } = req.query
    if (genre) {
        const filterMovieGenre = movies.filter(
            movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
        )
        res.status(200).json(filterMovieGenre)
    }
    res.json(movies)
})

app.get('/movies/:id', (req, res) => {
    const {id} = req.params
    const movie = movies.find(movie => movie.id === id)
    if(movie) return res.json({movie})
    res.status(404).json({ message:'Movide Not Found'})
})

app.post('/movies', (req, res) => {
    const result = validateMovie(req.body)

    if (result.error) {
        return res.status(400).json({error: JSON.parse(result.error.message)})
    }

    const newMovie = {
        id: crypto.randomUUID(),
        ...result.data
    }

    movies.push(newMovie)
    res.status(201).json(newMovie)
})

app.patch('/movies/:id' , (req, res) => {
    const {id} = req.params
    const result = validateMoviePartial(req.body)

    if (result.error) return res.status(400).json({ error: JSON.parse(result.error.message)})

    const movieID = movies.findIndex(movie => movie.id === id)
    if (movieID === -1  ) return res.status(404).json({ message: 'Not found'})

    const updateMovie = {
        ...movies[movieID],
        ...result.data
    }

    movies[movieID] = updateMovie
    return res.json(updateMovie)

})

app.delete('/movies/:id', (req, res) => {
    const {id} = req.params
    const movieID = movies.findIndex(movie => movie.id === id)
    if (movieID === -1) {
        return res.status(404).json({ success: false, message: 'Not found' })
    }

    movies.splice(movieID, 1)
    return res.json({ success: true, message: 'Movie deleted' })
})

const PORT = process.env.PORT ?? 1324


app.listen(PORT, () => {
    console.log(`server listening in http://localhost:${PORT}`)
})