import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { RegisterProps, UserModel } from 'adonis-rapid'

export default class RegisterController {
  constructor(private app: ApplicationContract) {}

  private async resetSession(session: HttpContextContract['session'], sessionKey: string) {
    if (session.has(sessionKey)) {
      session.put(sessionKey, '')
    }
  }

  public async store({ request, response, auth }: HttpContextContract) {
    try {
      const { schema, rules } = this.app.container.use('Adonis/Core/Validator')
      const { default: UserAppModel } = require(this.app.makePath('app', 'Models', 'User.ts')) as {
        default: UserModel
      }

      const data = await request.validate({
        schema: schema.create({
          uid: schema.string({ escape: true, trim: true }, [rules.email()]),
          name: schema.string({ escape: true, trim: true }),
          password: schema.string({}, [rules.minLength(8)]),
          confirm: schema.string({}, [rules.requiredIfExists('password')]),
        }),
      })

      const user = await UserAppModel.create({
        email: data.uid,
        password: data.password,
        name: data.name,
        rememberMeToken: null,
        twoFactorCode: null,
        twoFactorEnable: null,
        twoFactorRecoveryCode: null,
        avatar: null,
        avatar_url: null,
      })

      await UserAppModel.generateAvatar(user, data.name)

      response.redirect().toRoute('login')
    } catch (error) {
      console.log(error)
      return error
    }
  }

  public async show(context: HttpContextContract, data: RegisterProps) {
    await this.resetSession(context.session, 'errors.password')
    await this.resetSession(context.session, 'errors.uid')
    await this.resetSession(context.session, 'errors.confirm')
    await this.resetSession(context.session, 'errors.name')

    if (this.app.config.get('rapid.type') === 'inertia') {
      return context.inertia.render('Auth/Register', data)
    }

    return context.view.render('pages/auth/register', data)
  }
}
