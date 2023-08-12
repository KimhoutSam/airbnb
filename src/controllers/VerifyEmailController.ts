import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { VerifyEmailProps } from 'adonis-rapid'

export default class VerifyEmailController {
  constructor(public app: ApplicationContract) {}

  public async show(context: HttpContextContract, data: VerifyEmailProps) {
    if (this.app.container.hasBinding('EidelLev/Inertia')) {
      return context.inertia.render('Auth/VerifyEmail', data)
    }

    return context.view.render('pages/auth/verify-email', data)
  }

  public async create({}: HttpContextContract) {}
}
