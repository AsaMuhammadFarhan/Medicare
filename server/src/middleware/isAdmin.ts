import { MyContext } from '../types'
import { MiddlewareFn } from 'type-graphql'
import { User } from '../entities/User'

export const isAdmin: MiddlewareFn<MyContext> = async ({ context }, next) => {
  if(!context.req.session.userId) {
    throw new Error('not authenticated')
  }

  const user = await User.findOne(context.req.session.userId)
  if (!user) {
    throw new Error('user does not exist')
  }

  if (user.role != 'admin') {
    throw new Error('user is not admin')
  }

  return next()
}