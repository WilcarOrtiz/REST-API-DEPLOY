// movies.test.js
import { jest } from '@jest/globals'
import request from 'supertest'
import { createApp } from '../app.js'
// Mock del modelo con tu movie
const mockMovie = {
    _id: "68a08a0b3d63ee30441dded7",
    title: "Wilcar",
    year: 2000,
    director: "Ridley Scott",
    duration: 155,
    rate: 0.5,
    poster: "https://img.fruugo.com/product/0/60/14417600_max.jpg",
    genre: ["Action"]
}

const mockMovieModel = {
    getAll: jest.fn().mockResolvedValue([mockMovie]),
    getById: jest.fn((id) => Promise.resolve(mockMovie)),
}

// Crear la app
const app = createApp({ movieModel: mockMovieModel })

describe('Movies API', () => {

    it('GET /movies returns all movies', async () => {
        const res = await request(app).get('/movies')
        expect(res.status).toBe(200)
        expect(res.body).toEqual([mockMovie])
        expect(mockMovieModel.getAll).toHaveBeenCalled()
    })

    it('GET /movies/:id returns a movie', async () => {
        const res = await request(app).get(`/movies/${mockMovie._id}`)
        expect(res.status).toBe(200)
        expect(res.body.movie).toEqual(mockMovie)
        expect(mockMovieModel.getById).toHaveBeenCalled()
    })


})
