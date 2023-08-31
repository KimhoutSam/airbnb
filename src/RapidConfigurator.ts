import { RapidConfiguration } from 'adonis-rapid/instructions'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { ActionStoreKey, HandlerActions } from './contract/types'

export default class RapidConfigurator {
  constructor(
    public app: ApplicationContract,
    public baseConfig: RapidConfiguration
  ) {}

  /**
   * a state management for handler list
   */
  public actionStore = new Map<ActionStoreKey, HandlerActions>()

  /**
   * @warning
   *  ### THIS IS NOT FOR DEVELOPER USING | ONLY MAINTAINER
   *  ### USING AT YOUR OWN RISK
   *
   * get action for route name `login.show`
   */
  public getLoginShowAction() {
    if (this.app.container.hasBinding('EidelLev/Inertia')) {
      return 'LoginController.showInertia'
    }

    if (this.actionStore.has('login.show')) {
      const handler = this.actionStore.get('login.show') as HandlerActions<
        {
          hasForgotPassword: boolean
          hasRegister: boolean
        },
        Promise<string>
      >

      return handler
    }

    return 'LoginController.showView'
  }

  /**
   * custom your `login.show` route
   */
  public customLoginShowAction(
    action: HandlerActions<
      {
        hasForgotPassword: boolean
        hasRegister: boolean
      },
      Promise<string>
    >
  ) {
    if (this.actionStore.has('login.show')) {
      return
    }

    this.actionStore.set('login.show', action)
  }

  /**
   * @warning
   *
   * ### THIS IS NOT FOR DEVELOPER USING | ONLY MAINTAINER
   * ### USING AT YOUR OWN RISK
   *
   * get action for route name `login.store`
   */
  public getLoginStoreAction() {
    return 'LoginViewController.store'
  }

  /**
   * @warning
   *
   * ### THIS IS NOT FOR DEVELOPER USING | ONLY MAINTAINER
   * ### USING AT YOUR OWN RISK
   *
   * get action for route name `register.show`
   */
  public getRegisterShowAction() {
    if (this.app.container.hasBinding('EidelLev/Inertia')) {
      return 'RegisterInertiaController.showInertia'
    }

    if (this.actionStore.has('register.show')) {
      const handler = this.actionStore.get('register.show') as HandlerActions

      return handler
    }

    return 'RegisterViewController.showView'
  }

  /**
   * custom your `register.show` route
   */
  public customRegisterShowAction(action: HandlerActions) {
    if (this.actionStore.has('register.show')) {
      return
    }

    this.actionStore.set('register.show', action)
  }

  /**
   * @warning
   *
   * ### THIS IS NOT FOR DEVELOPER USING | ONLY MAINTAINER
   * ### USING AT YOUR OWN RISK
   *
   * get action for route name `register.store`
   */
  public getRegisterStoreAction() {
    return 'RegisterController.store'
  }
}
