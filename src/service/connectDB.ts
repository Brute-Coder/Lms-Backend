import mongoose from "mongoose"
import config from "../config/config"
import logger from "../util/logger"

export default {
  connect: async () => {
    try {
      await mongoose.connect(config.DATABASE_URL as string)
      return mongoose.connection
    } catch (error: unknown) {
      if (error instanceof Error) {
        logger.error(`DATABASE_ERROR`, {
          meta: {
            message: error.message,
            stack: error.stack
          }
        })
      } else {
        logger.error(`DATABASE_ERROR`, {
          meta: { message: "An unknown error occurred" }
        })
      }
      throw error
    }
  }
}

