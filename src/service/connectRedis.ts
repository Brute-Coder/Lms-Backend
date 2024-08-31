import { Redis } from "ioredis"
import config from "../config/config"
import logger from "../util/logger"

export default {
  connect: () => {
    if (!config.REDIS_URL) {
      throw new Error("REDIS_URL is not defined in the .env file")
    }
    try {
      const redis = new Redis(config.REDIS_URL)
      return redis
    } catch (error) {
      logger.error(`REDIS_ERROR`, {
        meta: {
          error: error,
          message: "An unknown error occurred"
        }
      })
      throw error
    }
  }
}

