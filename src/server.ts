import app from "./app"
import config from "./config/config"
import logger from "./util/logger"
import connectDB from "./service/connectDB"
import connectRedis from "./service/connectRedis"

const server = app.listen(config.PORT)

void (async () => {
  try {
    //database connection
    const connection = await connectDB.connect()
    logger.info(`DATABASE_CONNECTED`, {
      meta: { HOST: connection.host, PORT: connection.port, NAME: connection.name }
    })
    //redis connection
    const redis = connectRedis.connect()
    logger.info(`REDIS_CONNECTED`, {
      meta: { HOST: redis.options.host, PORT: redis.options.port }
    })
    logger.info(`APPLICATION_STARTED`, {
      meta: { PORT: config.PORT, NODE_ENV: config.ENV, SERVER_URL: config.CLIENT_URL }
    })
  } catch (err) {
    logger.error(`APPLICATION_ERROR`, {
      meta: err
    })
    server.close((err) => {
      if (err) {
        logger.error(`APPLICATION_ERROR`, {
          meta: err
        })
      }
      process.exit(1)
    })
  }
})()

