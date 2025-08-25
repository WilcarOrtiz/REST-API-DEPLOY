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

export const cacheInit = ExpressExpeditious(defaulOptions);
