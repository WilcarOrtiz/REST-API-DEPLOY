import { createApp } from './app.js'
import { movieModel } from './models/mongodb/movies.js'

const app = createApp({ movieModel })
const PORT = process.env.PORT ?? 1324
app.listen(PORT, () => console.log(`server listening in http://localhost:${PORT}`))
