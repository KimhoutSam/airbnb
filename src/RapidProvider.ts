import { ApplicationContract } from '@ioc:Adonis/Core/Application'

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
        Route.get('/login', 'LoginController.index').as('login').middleware('guest')
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
