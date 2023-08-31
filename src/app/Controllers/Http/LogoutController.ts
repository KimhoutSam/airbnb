import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LogoutController {
  public async updateView({ auth, response }: HttpContextContract) {
    await auth.use('web').logout()
    return response.redirect('/')
  }

  public async updateInertia({ auth, response }: HttpContextContract) {
    await auth.use('web').logout()
    return response.redirect('/')
  }
}
