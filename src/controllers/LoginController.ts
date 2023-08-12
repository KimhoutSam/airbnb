import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { LoginProps } from 'adonis-rapid'

export default class LoginController {
  constructor(private app: ApplicationContract) {}

  public async show(context: HttpContextContract, data: LoginProps) {
    if (this.app.container.hasBinding('EidelLev/Inertia')) {
      return context.inertia.render('Auth/Login', data)
    }

    return context.view.render('pages/auth/login', data)
  }

  public async store({ request, response, auth, session }: HttpContextContract) {
    try {
      const uid: string = request.input('uid')
      const password: string = request.input('password')
      const remember: boolean = request.input('remember', false)

      auth.use('web').attempt(uid, password, remember)
    } catch (error) {
      session.put('errors.uid', 'invaild uid credentials')
      session.put('errors.password', 'invaild password credentials')

      return response.badRequest('invaild key')
    }
  }
}
