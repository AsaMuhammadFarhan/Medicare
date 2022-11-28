import 'reflect-metadata'
import 'dotenv-safe/config'
import { createConnection } from 'typeorm'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import Redis from 'ioredis'
import session from 'express-session'
import connectRedis from 'connect-redis'
import { isProduction, isStaging } from './constants'
import { MyContext } from './types'
import cors from 'cors'
import path from 'path'
import { v4 as uuid } from 'uuid'
import { User } from './entities/User'
import { UserResolver } from './resolvers/user'
import { ConfigurationSettings } from './entities/ConfigurationSettings'
import { ConfigurationSettingResolver } from './resolvers/configurationSettings'

const main = async () => {
  const Conn = await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: process.env.TYPEORM_LOGGING.toLowerCase() == 'true' ? true : false,
    migrations: [path.join(__dirname, './migrations/*')],
    // LIST ENTITY
    entities: [
      User,
      ConfigurationSettings,
    ],
    ssl: undefined,
    extra: {
      max: process.env.DATABASE_CONNECTION_POOL_SIZE,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 3000,
    },
  })
  await Conn.runMigrations()
  const RedisStore = connectRedis(session)
  const redis = new Redis(process.env.REDIS_URL)

  const app = express()
  // Add a health check route in express
  app.get('/_health', (_, res) => {
    res.status(200).send('ok')
  })
  app.set('trust proxy', 1)

  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  )
  app.use(
    session({
      name: 'sid',
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: 'lax', // csrf
        secure: isProduction || isStaging, // cookie only work in https
        domain: isProduction || isStaging ? process.env.DOMAIN : undefined,
      },
      saveUninitialized: false,
      secret: process.env.REDIS_SECRET,
      resave: false,
    })
  )

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      // LIST RESOLVER
      resolvers: [
        UserResolver,
        ConfigurationSettingResolver,
      ],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ req, res, redis }),
    uploads: false,
    plugins: [
      {
        requestDidStart(ctx) {
          const requestId = uuid()
          if (ctx.request.operationName == 'IntrospectionQuery') {
            return
          }
          return {
            didEncounterErrors({ logger, errors }): void {
              errors.forEach((error) =>
                logger.warn({
                  ...error,
                  requestId,
                })
              )
            },
          }
        },
      },
    ],
  })

  apolloServer.applyMiddleware({ app, cors: false })

  app.get('/', (_, res) => {
    res.send('hello')
  })
  app.use(express.json())
  app.use(
    express.urlencoded({
      extended: true,
    })
  )
  app.listen(parseInt(process.env.PORT), () => {
    console.log('server started on localhost:4000')
  })
}

main().catch((err) => {
  console.log(err)
})
