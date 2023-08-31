import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { Features } from './contract/enum'
import { RouterContract } from '@ioc:Adonis/Core/Route'
import { RapidConfiguration } from 'adonis-rapid/instructions'
import type RapidConfigurator from './RapidConfigurator'

export default class RapidProvider {
  public bootRouteLoginIndex(Route: RouterContract, configurator: RapidConfigurator) {
    const loginIndex = configurator.getLoginIndexAction()

    if (typeof loginIndex === 'string') {
      Route.get('/login', loginIndex).as('login.index').middleware('guest')
    }

    if (typeof loginIndex === 'function') {
      Route.get('/login', async (context) => {
        return loginIndex(context, {
          hasForgotPassword: Route.has('forgot-password'),
          hasRegister: Route.has('register'),
        })
      })
        .as('login.index')
        .middleware('guest')
    }
  }

  public bootRouteLoginStore(Route: RouterContract, configurator: RapidConfigurator) {
    const loginStore = configurator.getLoginStoreAction()

    Route.post('/login', loginStore).as('login.store')
  }

  public bootRouteRegisterIndex(Route: RouterContract, configurator: RapidConfigurator) {
    const registerIndex = configurator.getRegisterIndexAction()

    if (typeof registerIndex === 'string') {
      Route.get('/register', registerIndex).as('register.index').middleware('guest')
    }

    if (typeof registerIndex === 'function') {
      Route.get('/register', async (context) => registerIndex(context, {}))
        .as('register.index')
        .middleware('guest')
    }
  }

  public bootRouteRegisterStore(Route: RouterContract, configurator: RapidConfigurator) {
    const registerStore = configurator.getRegisterStoreAction()

    Route.post('/register', registerStore).as('register.store')
  }

  public bootRouteLogoutUser(Route: RouterContract, configurator: RapidConfigurator) {
    Route.post('/logout', 'LogoutController.update').as('logout.update').middleware('guest')
  }

  constructor(public app: ApplicationContract) {}

  /**
   * Register your own bindings
   */
  public register() {
    const { default: RapidConfigurator } =
      require('./RapidConfigurator') as typeof import('./RapidConfigurator')

    this.app.container.singleton('SH8GH/Rapid/Configurator', () => {
      const configurator = new RapidConfigurator(this.app, this.app.config.get('rapid'))

      return configurator
    })
  }

  /**
   * IoC container is ready
   */
  public async boot() {
    this.app.container.withBindings(
      ['Adonis/Core/Route', 'SH8GH/Rapid/Configurator'],
      (Route, configurator) => {
        const rapidConfig = this.app.config.get('rapid') as RapidConfiguration

        Route.group(() => {
          if (rapidConfig.features.includes(Features.enableLogin)) {
            this.bootRouteLoginShow(Route, configurator)
            this.bootRouteLoginStore(Route, configurator)
          }
          if (rapidConfig.features.includes(Features.enableRegister)) {
            this.bootRouteRegisterShow(Route, configurator)
            this.bootRouteRegisterStore(Route, configurator)
          }
          if (rapidConfig.features.includes(Features.enableResetPassword)) {
          }
          if (rapidConfig.features.includes(Features.enableTwofactorAuth)) {
          }
          if (rapidConfig.features.includes(Features.enableVerifyEmail)) {
          }
          if (rapidConfig.features.includes(Features.enableForgotPassword)) {
          }
          if (rapidConfig.features.includes(Features.enableDeleteUserProfile)) {
          }
        }).namespace('Rapid/Controllers/Http')
      }
    )
  }

  /**
   * App is ready
   */
  public async ready() {}

  /**
   * Cleanup, since app is going down
   */
  public async shutdown() {}
}
