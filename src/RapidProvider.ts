import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import type { RapidConfig } from 'adonis-rapid'
import { Features } from './types'

export default class RapidProvider {
  constructor(protected app: ApplicationContract) {}

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
      ['SH8GH/Rapid/Configurator', 'Adonis/Core/Application', 'Adonis/Core/Route'],
      (Configurator, Application, Route) => {
        // Login
        if (Configurator.config.features.includes(Features.enableLoginView)) {
          Route.get('/login', async (context) => {
            const LoginRenderer = Configurator.getLoginRenderer()

            return LoginRenderer(context, {
              rapid: {
                password: context.session.get('errors.password'),
                uid: context.session.get('errors.uid'),
              },
            })
          })

          Route.post('/login', async (context) => {
            const { default: LoginController } = await import('./controllers/LoginController')

            const login = new LoginController(Application)

            return login.store(context)
          })
        }
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
