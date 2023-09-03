import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route'
import Mail from '@ioc:Adonis/Addons/Mail'

export default class InertiaEmailVerificationsController {
  public async index({ view }) {
    return view.render('pages/auth/verify-email')
  }

  public async store({ request, response }: HttpContextContract) {
    const { default: VerifyEmailValidator } = await import('../../Validators/VerifyEmailValidator')
    const { default: User } = await import('../../Models/User')

    const data = await request.validate(VerifyEmailValidator)

    const user = await User.query().where('email', data.email).first()

    if (user === null) {
      return response.redirect().back()
    }

    const url = Route.builder().params({ email: user.email }).makeSigned('verifying', {
      expiresIn: '5m',
    })

    return await Mail.sendLater((message) => {
      message
        .from(request.completeUrl())
        .to(user.email, user.getName())
        .subject(`welcome to application! ${user.getName()}`)
        .htmlView('partials/email', {
          user: { fullName: user.getName() },
          url: `${request.protocol()}://${request.host()}${url}&email=${user.email}`,
        })
    })
  }

  public async update({ request, response }: HttpContextContract) {
    if (request.hasValidSignature()) {
      const { default: VerifyingValidator } = await import('../../Validators/VerifyingValidator')

      const data = await request.validate(VerifyingValidator)

      const { default: User } = await import('../../Models/User')

      const user = await User.findByOrFail('email', data.email)

      user.emailVerified = true

      await user.save()

      return response.redirect().toRoute('dashboard')
    }

    return response.redirect().back()
  }
}
