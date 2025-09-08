/*
!para local 
import ExpressExpeditious from 'express-expeditious'
import expeditiousEngineRedis from 'expeditious-engine-redis'

const defaulOptions = {
    namespace: 'expresscache', // nombre/key en Redis
    defaultTtl: '1 minute',
    statusCodeExpires: {
        404: '5 minutes',
        500: 0
    },
    engine: expeditiousEngineRedis({
        host: '127.0.0.1',
        port: 6379
    })
};
export const cacheMiddleware = ExpressExpeditious(defaulOptions);
*/

import NodeCache from 'node-cache'
import { redisClient } from '../config/redis-config.js'

const memoryCache = new NodeCache({ stdTTL: 30 }) // TTL en segundos

export const cacheMiddleware = (ttl = 60) => {
    return async (req, res, next) => {
        const key = req.originalUrl

        // 1️⃣ Revisar cache en memoria
        const cachedMemory = memoryCache.get(key)
        if (cachedMemory) {
            console.log(`⚡ MemCache hit: ${key}`)
            return res.json(cachedMemory)
        }

        // 2️⃣ Revisar Redis
        const cachedRedis = await redisClient.get(key)
        if (cachedRedis) {
            console.log(`⚡ Redis hit: ${key}`)
            const parsed = JSON.parse(cachedRedis)
            memoryCache.set(key, parsed, ttl / 2)
            return res.json(parsed)
        }

        // 3️⃣ Ir a la DB y cachear en ambos
        res.sendResponse = res.json
        res.json = async (body) => {
            memoryCache.set(key, body, ttl / 2)
            await redisClient.setEx(key, ttl, JSON.stringify(body))
            res.sendResponse(body)
        }

        next()
    }
}
