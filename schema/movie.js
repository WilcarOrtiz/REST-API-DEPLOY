import z from 'zod'

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'the title movie should are string',
    require_error: 'movie title is required',
  }),
  year: z.number().int().min(1900).max(2025),
  director: z.string(),
  duration: z.number().positive(),
  rate: z.number().min(0).max(10).default(0.5),
  poster: z.string(),
  genre: z
    .enum([
      'Action',
      'Adventure',
      'Comedy',
      'Drama',
      'Fantasy',
      'Horror',
      'Thriller',
      'Sci-Fi',
    ])
    .array(),
})

export function validateMovie(object) {
  return movieSchema.safeParse(object)
}

export function validateMoviePartial(object) {
  return movieSchema.partial().safeParse(object)
}
