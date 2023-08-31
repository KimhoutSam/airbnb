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
   * get action for route name `login.index`
   */
  public getLoginIndexAction() {
    if (this.app.container.hasBinding('EidelLev/Inertia')) {
      return 'LoginController.indexInertia'
    }

    if (this.actionStore.has('login.index')) {
      const handler = this.actionStore.get('login.index') as HandlerActions<
        {
          hasForgotPassword: boolean
          hasRegister: boolean
        },
        Promise<string>
      >

      return handler
    }

    return 'LoginController.indexView'
  }

  /**
   * custom your `login.index` route
   */
  public customLoginIndexAction(
    action: HandlerActions<
      {
        hasForgotPassword: boolean
        hasRegister: boolean
      },
      Promise<string>
    >
  ) {
    if (this.actionStore.has('login.index')) {
      return
    }

    this.actionStore.set('login.index', action)
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
    return 'LoginController.storeView'
  }

  /**
   * @warning
   *
   * ### THIS IS NOT FOR DEVELOPER USING | ONLY MAINTAINER
   * ### USING AT YOUR OWN RISK
   *
   * get action for route name `register.index`
   */
  public getRegisterIndexAction() {
    if (this.app.container.hasBinding('EidelLev/Inertia')) {
      return 'RegisterInertiaController.indexInertia'
    }

    if (this.actionStore.has('register.index')) {
      const handler = this.actionStore.get('register.index') as HandlerActions

      return handler
    }

    return 'RegisterViewController.indexView'
  }

  /**
   * custom your `register.index` route
   */
  public customRegisterIndexAction(action: HandlerActions) {
    if (this.actionStore.has('register.index')) {
      return
    }

    this.actionStore.set('register.index', action)
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

  public getLogoutUpdateAction() {
    return 'LogoutController.update'
  }
}
