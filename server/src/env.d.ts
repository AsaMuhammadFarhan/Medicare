declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string,
      ENVIRONMENT: string,
      DATABASE_URL: string,
      DATABASE_CONNECTION_POOL_SIZE: string,
      TYPEORM_LOGGING: string,
      WEB_URL: string,
      REDIS_SECRET: string,
      REDIS_URL: string
    }
  }
}

export {}
