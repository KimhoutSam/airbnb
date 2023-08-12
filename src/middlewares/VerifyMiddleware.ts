import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class VerifyMiddleware {
  public handle({}: HttpContextContract, next: () => void) {
    return next()
  }
}
