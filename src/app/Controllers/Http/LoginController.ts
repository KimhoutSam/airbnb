import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route'

export default class LoginController {
  public async show({ view }: HttpContextContract) {
    return view.render('pages/auth/login', {
      rapid: {
        hasForgotPassword: Route.has('forgot-password'),
      },
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
