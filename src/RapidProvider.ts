import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { Features } from './contract/enum'
import { RouterContract } from '@ioc:Adonis/Core/Route'
import { RapidConfiguration } from './contract/instructions'
import { clsx, ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
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

  public bootRouteLogoutDistroy(Route: RouterContract, configurator: RapidConfigurator) {
    const logoutUpdate = configurator.getLogoutUpdateAction()

    Route.post('/logout', logoutUpdate).as('logout.update').middleware('guest')
  }

  public bootRouteVerifyEmailIndex(Route: RouterContract, configurator: RapidConfigurator) {
    const verifyEmailIndex = configurator.getVerifyEmailIndexAction()

    if (typeof verifyEmailIndex === 'function') {
      Route.get('/verify-email', async (context) => {
        return verifyEmailIndex(context, {})
      })
        .as('verify-email.index')
        .middleware('guest')
    }
    if (typeof verifyEmailIndex === 'string') {
      Route.get('/verify-email', verifyEmailIndex).as('verify-email.index').middleware('guest')
    }
  }

  public bootRouteVerifyEmailStore(Route: RouterContract, configurator: RapidConfigurator) {
    const verifyEmailStore = configurator.getVerifyEmailStoreAction()

    Route.post('/verify-email', verifyEmailStore).as('verify-email.post')
  }

  public bootRouteVerifyEmailUpdate(Route: RouterContract, configurator: RapidConfigurator) {
    const verifyEmailUpdate = configurator.getVerifyEmailUpdateAction()

    Route.put('/verify-email', verifyEmailUpdate).as('verify-email.update')
  }

  public bootRouteForgotPasswordIndex(Route: RouterContract, configurator: RapidConfigurator) {
    const forgotPasswprdIndex = configurator.getForgotPasswordIndexAction()

    if (typeof forgotPasswprdIndex === 'function') {
      Route.get('/forgot-password', async (context) => {
        return forgotPasswprdIndex(context, {})
      })
        .as('forgot-password.index')
        .middleware('guest')
    }
    if (typeof forgotPasswprdIndex === 'string') {
      Route.get('/forgot-password', forgotPasswprdIndex)
        .as('forgot-password.index')
        .middleware('guest')
    }
  }

  public bootRouteForgotPasswordUpdate(Route: RouterContract, configurator: RapidConfigurator) {
    const forgotPasswprdUpdate = configurator.getForgotPasswordUpdateAction()

    Route.post('/forgot-password', forgotPasswprdUpdate).as('forgot-password.update')
  }

  public bootRouteUserDistory(Route: RouterContract, configurator: RapidConfigurator) {
    const usersDistroy = configurator.getUserDistroyAction()

    Route.delete('/user-delete', usersDistroy).as('user.distroy')
  }

  public bootRouteUserUpdateEmail(Route: RouterContract, configurator: RapidConfigurator) {
    const userUpdateEmail = configurator.getUserUpdateEmailAction()
    Route.patch('/user-email', userUpdateEmail).as('user.update.email')
  }

  public bootRouteUserUpdateName(Route: RouterContract, configurator: RapidConfigurator) {
    const userUpdateName = configurator.getUserUpdateNameAction()
    Route.patch('/user-name', userUpdateName).as('user.update.name')
  }

  public bootRouteUserUpdateAvatar(Route: RouterContract, configurator: RapidConfigurator) {
    const userUpdateAvatar = configurator.getUserUpdateAvatarAction()
    Route.patch('/user-avatar', userUpdateAvatar).as('user.update.avatar')
  }

  public bootRouteUserUpdatePassword(Route: RouterContract, configurator: RapidConfigurator) {
    const userUpdatePassword = configurator.getUserUpdatePasswordAction()

    Route.patch('/user-password', userUpdatePassword).as('user.update.password')
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
    const View = this.app.container.use('Adonis/Core/View')

    View.global('cn', (...args: ClassValue[]) => clsx(...args))
    View.global('twcn', (...args: ClassValue[]) => twMerge(clsx(...args)))

    this.app.container.withBindings(
      ['Adonis/Core/Route', 'SH8GH/Rapid/Configurator', 'Adonis/Core/Logger'],
      (Route, configurator, _Logger) => {
        const rapidConfig = this.app.config.get('rapid') as RapidConfiguration

        Route.group(() => {
          if (rapidConfig.features.includes(Features.enableLogin)) {
            this.bootRouteLoginStore(Route, configurator)
            this.bootRouteLoginIndex(Route, configurator)
            this.bootRouteLogoutDistroy(Route, configurator)
          }
          if (rapidConfig.features.includes(Features.enableRegister)) {
            this.bootRouteRegisterIndex(Route, configurator)
            this.bootRouteRegisterStore(Route, configurator)
          }
          if (rapidConfig.features.includes(Features.enableResetPassword)) {
          }
          if (rapidConfig.features.includes(Features.enableTwofactorAuth)) {
          }
          if (rapidConfig.features.includes(Features.enableConfirmPassword)) {
          }
          if (rapidConfig.features.includes(Features.enableUpdateUserAvatar)) {
            this.bootRouteUserUpdateAvatar(Route, configurator)
          }
          if (rapidConfig.features.includes(Features.enableUpdateUserEmail)) {
            this.bootRouteUserUpdateEmail(Route, configurator)
          }
          if (rapidConfig.features.includes(Features.enableUpdateUserName)) {
            this.bootRouteUserUpdateName(Route, configurator)
          }
          if (rapidConfig.features.includes(Features.enableUpdateUserPassword)) {
            this.bootRouteUserUpdatePassword(Route, configurator)
          }
          if (rapidConfig.features.includes(Features.enableVerifyEmail)) {
            this.bootRouteVerifyEmailIndex(Route, configurator)
            this.bootRouteVerifyEmailStore(Route, configurator)
            this.bootRouteVerifyEmailUpdate(Route, configurator)
          }
          if (rapidConfig.features.includes(Features.enableForgotPassword)) {
            this.bootRouteForgotPasswordIndex(Route, configurator)
            this.bootRouteForgotPasswordUpdate(Route, configurator)
          }
          if (rapidConfig.features.includes(Features.enableDistroyUserProfile)) {
            this.bootRouteUserDistory(Route, configurator)
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
