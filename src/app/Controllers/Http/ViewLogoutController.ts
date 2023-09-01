import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ViewLogoutController {
  public async updateView({ auth, response }: HttpContextContract) {
    await auth.use('web').logout()
    return response.redirect('/')
  }
}
