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
      return 'InertiaLoginController.index'
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

    return 'ViewLoginController.index'
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
    if (this.app.container.hasBinding('EidelLev/Inertia')) {
      return 'InertiaLoginController.store'
    }

    return 'ViewLoginController.store'
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
      return 'InertiaRegisterController.index'
    }

    if (this.actionStore.has('register.index')) {
      const handler = this.actionStore.get('register.index') as HandlerActions

      return handler
    }

    return 'ViewRegisterController.index'
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
    if (this.app.container.hasBinding('EidelLev/Inertia')) {
      return 'InertiaRegisterController.store'
    }

    return 'ViewRegisterController.store'
  }

  /**
   * @warning
   *
   * ### THIS IS NOT FOR DEVELOPER USING | ONLY MAINTAINER
   * ### USING AT YOUR OWN RISK
   *
   * get action for route name `logout.update`
   */
  public getLogoutUpdateAction() {
    if (this.app.container.hasBinding('EidelLev/Inertia')) {
      return 'InertiaLogoutController.update'
    }

    return 'ViewLogoutController.update'
  }

  /**
   * @warning
   *
   * ### THIS IS NOT FOR DEVELOPER USING | ONLY MAINTAINER
   * ### USING AT YOUR OWN RISK
   *
   * get action for route name `verify-email.index`
   */
  public getVerifyEmailIndexAction() {
    if (this.actionStore.has('verify-email.index')) {
      const handler = this.actionStore.get('verify-email.index') as HandlerActions

      return handler
    }

    if (this.app.container.hasBinding('EidelLev/Inertia')) {
      return 'InertiaEmailVerificationsController.index'
    }

    return 'ViewEmailVerificationsController.index'
  }

  /**
   * @warning
   *
   * ### THIS IS NOT FOR DEVELOPER USING | ONLY MAINTAINER
   * ### USING AT YOUR OWN RISK
   *
   * get action for route name `verify-email.store`
   */
  public getVerifyEmailStoreAction() {
    if (this.app.container.hasBinding('EidelLev/Inertia')) {
      return 'InertiaEmailVerificationsController.store'
    }

    return 'ViewEmailVerificationsController.store'
  }

  /**
   * @warning
   *
   * ### THIS IS NOT FOR DEVELOPER USING | ONLY MAINTAINER
   * ### USING AT YOUR OWN RISK
   *
   * get action for route name `verify-email.update`
   */
  public getVerifyEmailUpdateAction() {
    if (this.app.container.hasBinding('EidelLev/Inertia')) {
      return 'InertiaEmailVerificationsController.update'
    }

    return 'ViewEmailVerificationsController.update'
  }

  /**
   * custom your `verify-email.index` route
   */
  public customVerifyEmailIndexAction(action: HandlerActions) {
    if (this.actionStore.has('verify-email.index')) {
      return
    }

    this.actionStore.set('verify-email.index', action)
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
}
