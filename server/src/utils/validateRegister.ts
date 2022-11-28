import { FieldError } from '../resolvers/user'
import { UsernamePasswordInput } from '../resolvers/UsernamePasswordInput'

export const validateRegister = (options: UsernamePasswordInput): FieldError[] | null => {
  if (options.username.length <= 2) {
    return [{
      field: 'username',
      message: 'username length must be greater than 2'
    }]
  }

  if (options.username.includes('@')) {
    return [{
      field: 'username',
      message: 'cannot include @ sign'
    }]
  }

  if (!options.email.includes('@')) {
    return [{
      field: 'email',
      message: 'invalid email'
    }]
  }

  if (options.password.length <= 3) {
    return [{
      field: 'password',
      message: 'password length must be greater than 3'
    }]
  }

  return null
}