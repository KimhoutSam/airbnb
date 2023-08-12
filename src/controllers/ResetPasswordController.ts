import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ResetPasswordProps } from 'adonis-rapid'

export default class ResetPasswordController {
  constructor(public app: ApplicationContract) {}

  public async show(context: HttpContextContract, data: ResetPasswordProps) {
    if (this.app.container.hasBinding('EidelLev/Inertia')) {
      return context.inertia.render('Auth/ResetPassword', data)
    }

    return context.view.render('pages/auth/reset-password', data)
  }

  public async update({}: HttpContextContract) {}
}
