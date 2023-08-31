import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { Features } from './contract/enum'
import { RouterContract } from '@ioc:Adonis/Core/Route'
import { RapidConfiguration } from 'adonis-rapid/instructions'
import type RapidConfigurator from './RapidConfigurator'

export default class RapidProvider {
  public bootRouteLoginShow(Route: RouterContract, configurator: RapidConfigurator) {
    const loginShow = configurator.getLoginShowAction()

    if (typeof loginShow === 'string') {
      Route.get('/login', loginShow).as('login.show').middleware('guest')
    }

    if (typeof loginShow === 'function') {
      Route.get('/login', async (context) => {
        return loginShow(context, {
          hasForgotPassword: Route.has('forgot-password'),
          hasRegister: Route.has('register'),
        })
      })
        .as('login.show')
        .middleware('guest')
    }
  }

  public bootRouteLoginStore(Route: RouterContract, configurator: RapidConfigurator) {
    const loginStore = configurator.getLoginStoreAction()

    Route.post('/login', loginStore).as('login.store')
  }

  public bootRouteRegisterShow(Route: RouterContract, configurator: RapidConfigurator) {
    const registerShow = configurator.getRegisterShowAction()

    if (typeof registerShow === 'string') {
      Route.get('/register', registerShow).as('register.show').middleware('guest')
    }

    if (typeof registerShow === 'function') {
      Route.get('/register', async (context) => registerShow(context, {}))
    }
  }

  public bootRouteRegisterStore(Route: RouterContract, configurator: RapidConfigurator) {
    const registerStore = configurator.getRegisterStoreAction()

    Route.post('/register', registerStore).as('register.store')
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
