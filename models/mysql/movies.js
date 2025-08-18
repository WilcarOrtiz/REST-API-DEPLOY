import mysql from 'mysql2/promise'

const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '',
    database: 'moviesdb'
}

const conection = await mysql.createConnection(config)


export class movieModel {
    static async getAll({ genre }) {
        if (genre) {
            const inputGenre = genre.toLowerCase()
            const [genero] = await conection.query('SELECT id, name FROM genre WHERE LOWER(name) = ?;', [inputGenre])
            if (genero.length === 0) return []
            const [{ id }] = genero
            const [movies] = await conection.query(
                'SELECT title, year, director, poster, rate, BIN_TO_UUID(id) id FROM movie INNER JOIN movie_genres ON movie_genres.movie_id = movie.id WHERE movie_genres.genre_id = ?;', [id]
            )
            return movies.length === 0 ? [] : movies
        }
        const [movies] = await conection.query(
            'SELECT title, year, director, poster, rate, BIN_TO_UUID(id) id FROM movie;'
        )
        return movies
    }

    static async getById({ id }) {
        const [result] = await conection.query(
            `SELECT title, year, director, poster, rate, BIN_TO_UUID(id) id 
     FROM movie 
     WHERE id = UUID_TO_BIN(?)`,
            [id]
        )
        return result[0] ?? null
    }


    static async create({ input }) {
        const { title, year, director, duration, poster, rate, genre } = input

        let uuid
        try {
            const [uuidResult] = await conection.query('SELECT UUID() uuid;')
            uuid = uuidResult[0].uuid
        } catch (error) {
            console.error("Error al generar UUID:", error)
            throw error
        }

        try {
            await conection.query(
                `INSERT INTO movie (id, title, year, director, duration, poster, rate) 
             VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?)`,
                [uuid, title, year, director, duration, poster, rate]
            )
        } catch (error) {
            console.error("Error al insertar película:", error)
            throw error
        }

        let genresId = []
        try {
            for (const gener of genre) {
                const inputGenre = gener.toLowerCase()
                const [genero] = await conection.query(
                    'SELECT id FROM genre WHERE LOWER(name) = ?;',
                    [inputGenre]
                )
                if (genero.length > 0) genresId.push(genero[0].id)
            }
        } catch (error) {
            console.error("Error al obtener géneros:", error)
            throw error
        }

        try {
            for (const id of genresId) {
                await conection.query(
                    'INSERT INTO movie_genres (movie_id, genre_id) VALUES (UUID_TO_BIN(?), ?);',
                    [uuid, id]
                )
            }
        } catch (error) {
            console.error("Error al insertar géneros de la película:", error)
            throw error
        }

        try {
            const [result] = await conection.query(`SELECT title, year, director, poster, rate, BIN_TO_UUID(id) id FROM movie WHERE id = UUID_TO_BIN(?)`, [uuid])
            return result[0] ?? null
        } catch (error) {
            console.error("Error al consultar película insertada:", error)
            throw error
        }
    }

    static async delete({ id }) {
        const [result] = await conection.query(`DELETE FROM movie WHERE id = UUID_TO_BIN(?);`, [id]);
        if (!result.affectedRows) return false;
        await conection.query(`DELETE FROM movie_genres WHERE movie_id = UUID_TO_BIN(?);`, [id]);
        return true;
    }

    static async update({ id, input }) {

    }
}