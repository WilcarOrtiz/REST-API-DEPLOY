import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:1324',
  'http://localhost:1234',
  'http://localhost:8080',
  'https://rest-api-deploy-production-cdc7.up.railway.app/',
]

export const corsMiddleware = (acceptedOrigin = ACCEPTED_ORIGINS) =>
  cors({
    origin: (origin, callback) => {
      if (acceptedOrigin.includes(origin)) return callback(null, true)
      if (!origin) return callback(null, true)
      return callback(new Error('Not allowed by CORS'))
    },
  })
