import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'
import Application from '@ioc:Adonis/Core/Application'

export default class UsersController {
  public async distroy({ request, response }: HttpContextContract) {
    const { default: UserDeleteValidator } = await import('../../Validators/UserDeleteValidator')
    const { default: User } = await import('../../Models/User')

    const data = await request.validate(UserDeleteValidator)

    const user = await User.findBy('email', data.email)

    await user!.delete()

    return response.redirect().toRoute('home')
  }

  public async updateEmail({ request, auth }: HttpContextContract) {
    const { default: UserUpdateEmailValidator } = await import(
      '../../Validators/UserUpdateEmailValidator'
    )

    const data = await request.validate(UserUpdateEmailValidator)

    try {
      const user = await auth.use('web').verifyCredentials(data.email, data.password)

      user.email = data.value

      await user.save()

      return user
    } catch (error) {
      return error
    }
  }

  public async updateName({ request, auth }: HttpContextContract) {
    const { default: UserUpdateNameValidator } = await import(
      '../../Validators/UserUpdateNameValidator'
    )

    const data = await request.validate(UserUpdateNameValidator)

    try {
      const user = await auth.use('web').verifyCredentials(data.email, data.password)

      user.firstName = data.first_name

      user.lastName = data.last_name

      user.middleName = data.middle_name ?? null

      await user.save()

      return user
    } catch (error) {
      return error
    }
  }

  public async updatePassword({ request, auth }: HttpContextContract) {
    const { default: UserUpdatePasswordValidator } = await import(
      '../../Validators/UserUpdatePasswordValidator'
    )

    const data = await request.validate(UserUpdatePasswordValidator)

    try {
      const user = await auth.use('web').verifyCredentials(data.email, data.password)

      if (await Hash.verify(user.password, data.confirm_password)) {
        throw new ReferenceError(
          'E_CANNOT_UPDATE_PASSWORD_FROM_INCORRECT_PASSWORD incorrect password passing'
        )
      }

      user.password = data.new_password

      await user.save()

      return user
    } catch (error) {
      return error
    }
  }

  public async updateAvatar({ request, auth }: HttpContextContract) {
    const { default: UserUpdateAvatarValidator } = await import(
      '../../Validators/UserUpdateAvatarValidator'
    )

    const data = await request.validate(UserUpdateAvatarValidator)

    try {
      const user = await auth.use('web').verifyCredentials(data.email, data.password)

      const name = `${String(data.file.tmpPath?.replace('/tmp/', ''))}-${Date.now()}.${
        data.file.extname
      }`

      await data.file.move(Application.publicPath('uploads'), {
        name,
      })

      user.avatar_url = `${request.protocol()}://${request.host()}/uploads/${name}`

      await user.save()

      return user
    } catch (error) {
      return error
    }
  }
}
