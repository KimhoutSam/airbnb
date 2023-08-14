import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { LoginProps, UserModel } from 'adonis-rapid'

export default class LoginController {
  constructor(private app: ApplicationContract) {}

  private async resetSession(session: HttpContextContract['session'], sessionKey: string) {
    if (session.has(sessionKey)) {
      session.put(sessionKey, '')
    }
  }

  public async show(context: HttpContextContract, data: LoginProps) {
    await this.resetSession(context.session, 'errors.uid')
    await this.resetSession(context.session, 'errors.password')

    if (this.app.config.get('rapid.type') === 'inertia') {
      return context.inertia.render('Auth/Login', data)
    }

    return context.view.render('pages/auth/login', data)
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      await auth.use('web').attempt(email, password)
      return response.redirect().toRoute('dashboard')
    } catch (error) {
      return response.redirect().back()
    }
  }
}
