import 'dotenv/config'
import { createApp } from './app.js'
import { movieModel } from './models/mongodb/movies.js'

const app = createApp({ movieModel })
const PORT = process.env.PORT ?? 1324
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`)
    console.log(`🌐 Redis URL: ${process.env.REDIS_URL ? 'Loaded' : 'Not loaded'}`)
});