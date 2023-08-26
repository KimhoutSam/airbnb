import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Guest {
  /**
   * check home location you wanted to redirect
   */
  public HOME = '/'

  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    if (auth.isGuest) {
      return await next()
    }

    return response.redirect().toRoute(this.HOME)
  }
}
