import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterController {
  public async index({ view }: HttpContextContract) {
    return view.render('pages/auth/register')
  }

  public async create({ request, session, response, auth }: HttpContextContract) {
    const { default: RegisterValidator } = await import('../../Validators/RegisterValidator')
    const { default: User } = await import('../../Models/User')

    const data = await request.validate(RegisterValidator)

    if (data.password !== data.password_confirmation) {
      session.flashMessages.set(
        'errors.password_confirmation',
        'your password and your confirm not match'
      )

      return response.redirect().back()
    }

    const user = await User.create({
      avatar: null,
      name: data.name,
      password: data.password,
      avatar_url: null,
      email: data.uid,
    })

    try {
      await auth.use('web').login(user)
    } catch (error) {
      return response.redirect().back()
    }

    return response.redirect().toRoute('dashboard')
  }
}
