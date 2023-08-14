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

  public async store({ request, response, auth, session }: HttpContextContract) {
    const Hash = this.app.container.use('Adonis/Core/Hash')
    const uid: string = request.input('uid')
    const password: string = request.input('password')
    const remember: boolean = request.input('remember', false)
    const { default: UserAppModel } = require(this.app.makePath('app', 'Models', 'User.ts')) as {
      default: UserModel
    }

    try {
      //

      // Attempt And Redirect Home
      auth.use('web').attempt(uid, password, remember)
      return response.redirect('/')

      //
    } catch (error) {
      //

      // get Model By Email
      const model = await UserAppModel.findBy('email', uid)

      // Check If Model Exist
      if (model === null) {
        session.put('errors.uid', 'this uid is invaild since there no user with that uid')
        return response.redirect().back()
      }

      // Check If Password Correct With The Model
      if (await Hash.verify(model.password, password)) {
        session.put('errors.password', 'this password is invaild to this uid')
        return response.redirect().back()
      }

      // Check Other Error Than Client-Side Input Error
      console.log(error)
      return response.redirect().back()
    }
  }
}
