import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { Features } from './contract/enum'

export default class RapidProvider {
  constructor(public app: ApplicationContract) {}
  /**
   * Register your own bindings
   */
  public register() {}

  /**
   * IoC container is ready
   */
  public async boot() {
    this.app.container.withBindings(['Adonis/Core/Route'], (Route) => {
      Route.group(() => {
        if (this.app.config.get('rapid.features', []).includes(Features.enableLoginView)) {
          Route.get('/login', 'LoginController.show').as('login').middleware('guest')
          Route.post('/login', 'LoginController.store').as('login')
        }
      }).namespace('Rapid/Controllers/Http')
    })
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
