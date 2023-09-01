import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route'

export default class InertiaLoginController {
  public async index({ inertia }: HttpContextContract) {
    return inertia.render('Auth/Login', {
      hasForgotPassword: Route.has('forgot-password'),
      hasRegister: Route.has('register'),
    })
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const { default: LoginValidator } = await import('../../Validators/LoginValidator')

    const data = await request.validate(LoginValidator)

    try {
      await auth.use('web').attempt(data.uid, data.password, data.remember ?? false)
    } catch {
      return response.redirect().back()
    }

    return response.redirect().toRoute('dashboard')
  }
}
