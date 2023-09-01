import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ViewUsersController {
  public async distroy({ request, response }: HttpContextContract) {
    const { default: UserDeleteValidator } = await import('../../Validators/UserDeleteValidator')
    const { default: User } = await import('../../Models/User')

    const data = await request.validate(UserDeleteValidator)

    const user = await User.findByOrFail('email', data.email)

    await user.delete()

    return response.redirect().toRoute('home')
  }
}
