import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import type { RapidConfig } from 'adonis-rapid'
import type { RouterContract } from '@ioc:Adonis/Core/Route'
import { Features } from './types'
import { RapidConfiguratorContract } from 'adonis-rapid'

export default class RapidProvider {
  constructor(protected app: ApplicationContract) {}

  private bootLoginStatic(
    Configurator: RapidConfiguratorContract,
    Application: ApplicationContract,
    Route: RouterContract
  ) {
    // Login and Static
    if (
      Configurator.config.features.includes(Features.enableLoginView) &&
      Configurator.config.types === 'static'
    ) {
      Route.get('/login', async (context) => {
        const LoginRenderer = Configurator.getLoginRenderer()

        return LoginRenderer(context, {
          rapid: {
            password: context.session.get('errors.password'),
            uid: context.session.get('errors.uid'),
          },
        })
      }).as('login')

      Route.post('/login', async (context) => {
        const { default: LoginController } = await import('./controllers/LoginController')

        const login = new LoginController(Application)

        return login.store(context)
      }).as('login.post')
    }
  }

  private bootRegisterStatic(
    Configurator: RapidConfiguratorContract,
    Application: ApplicationContract,
    Route: RouterContract
  ) {
    // Register and Static
    if (
      Configurator.config.features.includes(Features.enableRegisterView) &&
      Configurator.config.types === 'static'
    ) {
      Route.get('/register', async (context) => {
        const getRegisterRenderer = Configurator.getRegisterRenderer()

        return getRegisterRenderer(context, {
          rapid: {
            password: context.session.get('errors.password'),
            confirm: context.session.get('errors.confirm'),
            uid: context.session.get('errors.uid'),
          },
        })
      }).as('register')

      Route.post('/register', async (context) => {
        const { default: RegisterController } = await import('./controllers/RegisterController')

        const register = new RegisterController(Application)

        return register.store(context)
      }).as('register.post')
    }
  }

  private bootForgotPasswordStatic(
    Configurator: RapidConfiguratorContract,
    Application: ApplicationContract,
    Route: RouterContract
  ) {
    // Forgot Password and Static
    if (
      Configurator.config.features.includes(Features.enableForgotPasswordView) &&
      Configurator.config.types === 'static'
    ) {
      Route.get('/forgot-password', async (context) => {
        const forgotPasswordRenderer = Configurator.getForgotPasswordRenderer()

        return forgotPasswordRenderer(context, {
          rapid: {},
        })
      }).as('forgot-password')

      Route.post('/forgot-password', async (context) => {
        const { default: ForgotPasswordController } = await import(
          './controllers/ForgotPasswordController'
        )

        const register = new ForgotPasswordController(Application)

        return register.update(context)
      }).as('forgot-password.post')
    }
  }

  private bootResetPasswordStatic(
    Configurator: RapidConfiguratorContract,
    Application: ApplicationContract,
    Route: RouterContract
  ) {
    // Reset Password and Static
    if (
      Configurator.config.features.includes(Features.enableResetPasswordView) &&
      Configurator.config.types === 'static'
    ) {
      Route.get('/reset-password', async (context) => {
        const resetPasswordRenderer = Configurator.getResetPasswordRenderer()

        return resetPasswordRenderer(context, {
          rapid: {},
        })
      }).as('reset-password')

      Route.post('/reset-password', async (context) => {
        const { default: ResetPasswordController } = await import(
          './controllers/ResetPasswordController'
        )

        const register = new ResetPasswordController(Application)

        return register.update(context)
      }).as('reset-password.post')
    }
  }

  public register() {
    // Register your own bindings

    this.app.container.singleton('SH8GH/Rapid/Configurator', () => {
      const config = this.app.container.resolveBinding('Adonis/Core/Config')
      const rootConfig: RapidConfig = config.get('rapid')
      const { default: Configurator } = require('./Configurator')

      return new Configurator(rootConfig, this.app)
    })
  }

  public async boot() {
    // All bindings are ready, feel free to use them

    this.app.container.withBindings(
      ['SH8GH/Rapid/Configurator', 'Adonis/Core/Route'],
      (Configurator, Route) => {
        this.bootLoginStatic(Configurator as RapidConfiguratorContract, this.app, Route)
        this.bootRegisterStatic(Configurator as RapidConfiguratorContract, this.app, Route)
        this.bootForgotPasswordStatic(Configurator as RapidConfiguratorContract, this.app, Route)
        this.bootResetPasswordStatic(Configurator as RapidConfiguratorContract, this.app, Route)
      }
    )
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
