import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mail from '@ioc:Adonis/Addons/Mail'

export default class ForgotPasswordController {
  public async index({ view }: HttpContextContract) {
    return view.render('pages/auth/forgot-password')
  }

  public async update({ request }: HttpContextContract) {
    const { default: ForgotPasswordValidator } = await import(
      '../../Validators/ForgotPasswordValidator'
    )

    const data = await request.validate(ForgotPasswordValidator)

    return await Mail.sendLater((message) => {
      message
        .from(request.completeUrl())
        .to(data.email)
        .subject('reset password link')
        .htmlView('partials/reset', {})
    })
  }
}
