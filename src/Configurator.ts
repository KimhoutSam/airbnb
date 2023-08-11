import { CallbackAction, RapidConfig, RapidConfiguratorContract, RendererKey } from 'adonis-rapid'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import LoginController from './controllers/LoginController'
import RegisterController from './controllers/RegisterController'

export default class Configurator implements RapidConfiguratorContract {
  #actionStore = new Map<RendererKey, CallbackAction<Record<string, any>>>()

  #catching() {
    const err = [
      'are you sure? you has rapid.ts in config folder?',
      'custom provider that change template?',
      'you do not have that require file?',
    ]

    return err.join(' or ')
  }

  constructor(
    public config: RapidConfig,
    public app: ApplicationContract
  ) {}

  public LoginRenderer(action: CallbackAction<{ rapid: { password: any; uid: any } }>): void {
    if (this.#actionStore.has('login')) return

    this.#actionStore.set('login', action)
  }

  public getLoginRenderer(): CallbackAction<{ rapid: { password: any; uid: any } }> {
    try {
      if (this.#actionStore.has('login')) {
        return this.#actionStore.get('login')!
      }

      const login = new LoginController(this.app)

      return async (context, data) => login.show(context, data)
    } catch {
      return async () => this.#catching()
    }
  }

  public RegisterRenderer(
    action: CallbackAction<{ rapid: { password: any; uid: any; confirm: any } }>
  ): void {
    if (this.#actionStore.has('register')) return

    this.#actionStore.set('register', action)
  }

  public getRegisterRenderer(): CallbackAction<{
    rapid: { password: any; uid: any; confirm: any }
  }> {
    try {
      if (this.#actionStore.has('register')) {
        return this.#actionStore.get('register')!
      }

      const register = new RegisterController(this.app)

      return async (context, data) => register.show(context, data)
    } catch {
      return async () => this.#catching()
    }
  }
}
