import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'

declare module 'adonis-rapid' {
  interface Controllers {
    LoginController: ControllerConstruct<LoginController>
  }
}

export default class LoginController {
  constructor(private app: ApplicationContract) {}

  public async show(
    context: HttpContextContract,
    data: {
      rapid: {
        password: any
        uid: any
      }
    }
  ) {
    if (this.app.container.hasBinding('EidelLev/Inertia')) {
      return context.inertia.render('Auth/Login', data)
    }

    return context.view.render('Pages/Auth/Login', data)
  }

  public store({ request, response, auth, session }: HttpContextContract) {
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
