import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import UserModelHOF from './core/models'

export default class RapidProvider {
  constructor(public app: ApplicationContract) {}
  /**
   * Register your own bindings
   */
  public register() {
    this.app.container.singleton('SH8GH/Rapid/Core', () => {
      return {
        UserModel: UserModelHOF(this.app),
      }
    })
  }

  /**
   * IoC container is ready
   */
  public async boot() {}

  /**
   * App is ready
   */
  public async ready() {}

  /**
   * Cleanup, since app is going down
   */
  public async shutdown() {}
}
