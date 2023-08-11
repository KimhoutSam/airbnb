import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

declare module 'adonis-rapid' {
  interface Middlewares {
    VerifyMiddleware: MiddlewareConstruct<VerifyMiddleware>
  }
}

export default class VerifyMiddleware {
  public handle({}: HttpContextContract, next: () => void) {
    return next()
  }
}
