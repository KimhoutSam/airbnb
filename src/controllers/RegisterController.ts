import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class RegisterController {
  #app: ApplicationContract

  constructor(app: ApplicationContract) {
    this.#app = app
  }

  public async store({}: HttpContextContract) {}

  public async show(
    { inertia, view }: HttpContextContract,
    data: { rapid: { password: any; uid: any } }
  ) {
    if (this.#app.container.hasBinding('EidelLev/Inertia')) {
      return inertia.render('Auth/Register', data)
    }

    return view.render('Pages/Auth/Register', data)
  }
}
