import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { HOFRapidUserModels } from './core/models'
import { HOFForgotPasswordValidator, HOFLoginValidator } from './core/validator'

export default class RapidProvider {
  constructor(public app: ApplicationContract) {}
  /**
   * Register your own bindings
   */
  public register() {
    this.app.container.singleton('SH8GH/Rapid/Core', () => {
      return {
        UserModel: HOFRapidUserModels(this.app),
        ForgotPasswordValidator: HOFForgotPasswordValidator(this.app),
        LoginValidator: HOFLoginValidator(this.app),
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
