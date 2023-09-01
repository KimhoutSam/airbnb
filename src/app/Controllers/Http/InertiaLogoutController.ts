import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class InertiaLogoutController {
  public async update({ auth, response }: HttpContextContract) {
    await auth.use('web').logout()
    return response.redirect('/')
  }
}
