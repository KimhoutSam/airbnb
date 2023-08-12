import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { VerifyEmailProps } from 'adonis-rapid'

export default class VerifyEmailController {
  constructor(private app: ApplicationContract) {}

  public async show(context: HttpContextContract, data: VerifyEmailProps) {
    if (this.app.config.get('rapid.type') === 'inertia') {
      return context.inertia.render('Auth/VerifyEmail', data)
    }

    return context.view.render('pages/auth/verify-email', data)
  }

  public async update({}: HttpContextContract) {}
}
