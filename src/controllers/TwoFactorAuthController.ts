import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { TwoFactorChallengeProps } from 'adonis-rapid'

export default class TwoFactorAuthController {
  constructor(public app: ApplicationContract) {}

  public async show(context: HttpContextContract, data: TwoFactorChallengeProps) {
    if (this.app.config.get('rapid.type') === 'inertia') {
      return context.inertia.render('Auth/TwoFactorChallenge', data)
    }

    return context.view.render('pages/auth/two-factor-challenge', data)
  }

  public async update({}: HttpContextContract) {}
}
