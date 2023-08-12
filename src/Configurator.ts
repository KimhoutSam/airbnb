import { CallbackAction, RapidConfig, RapidConfiguratorContract, RendererKey } from 'adonis-rapid'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import LoginController from './controllers/LoginController'
import RegisterController from './controllers/RegisterController'
import VerifyEmailController from './controllers/VerifyEmailController'
import ResetPasswordController from './controllers/ResetPasswordController'
import TwoFactorAuthController from './controllers/TwoFactorAuthController'
import ForgotPasswordController from './controllers/ForgotPasswordController'
import { ForgotPasswordProps } from 'adonis-rapid'
import { ResetPasswordProps } from 'adonis-rapid'
import { VerifyEmailProps } from 'adonis-rapid'
import { TwoFactorChallengeProps } from 'adonis-rapid'
import { LoginProps } from 'adonis-rapid'
import { RegisterProps } from 'adonis-rapid'

export default class Configurator implements RapidConfiguratorContract {
  #actionStore = new Map<RendererKey, CallbackAction<Record<string, any>>>()

  #catching() {
    const err = [
      'are you sure? you has rapid.ts in config folder?',
      'custom provider that change template?',
      'you do not have that require file?',
    ]

    return err.join(' or ')
  }

  constructor(
    public config: RapidConfig,
    public app: ApplicationContract
  ) {}

  public ForgotPasswordRenderer(action: CallbackAction<ForgotPasswordProps>): void {
    if (this.#actionStore.has('forgot-password')) return

    this.#actionStore.set('forgot-password', action)
  }
  public ResetPasswordRenderer(action: CallbackAction<ResetPasswordProps>): void {
    if (this.#actionStore.has('reset-password')) return

    this.#actionStore.set('reset-password', action)
  }

  public TwoFactorChallengeRenderer(action: CallbackAction<TwoFactorChallengeProps>): void {
    if (this.#actionStore.has('two-factor-challenge')) return

    this.#actionStore.set('two-factor-challenge', action)
  }

  public VerifyEmailRenderer(action: CallbackAction<VerifyEmailProps>): void {
    if (this.#actionStore.has('verify-email')) return

    this.#actionStore.set('verify-email', action)
  }

  public LoginRenderer(action: CallbackAction<LoginProps>): void {
    if (this.#actionStore.has('login')) return

    this.#actionStore.set('login', action)
  }

  public RegisterRenderer(action: CallbackAction<RegisterProps>): void {
    if (this.#actionStore.has('register')) return

    this.#actionStore.set('register', action)
  }

  public getForgotPasswordRenderer(): CallbackAction<ForgotPasswordProps> {
    try {
      if (this.#actionStore.has('forgot-password')) {
        return this.#actionStore.get('forgot-password')!
      }

      const forgotPassword = new ForgotPasswordController(this.app)

      return async (context, data) => forgotPassword.show(context, data)
    } catch {
      return async () => this.#catching()
    }
  }

  public getResetPasswordRenderer(): CallbackAction<ResetPasswordProps> {
    try {
      if (this.#actionStore.has('reset-password')) {
        return this.#actionStore.get('reset-password')!
      }

      const resetPassword = new ResetPasswordController(this.app)

      return async (context, data) => resetPassword.show(context, data)
    } catch {
      return async () => this.#catching()
    }
  }

  public getTwoFactorChallengeRenderer(): CallbackAction<TwoFactorChallengeProps> {
    try {
      if (this.#actionStore.has('two-factor-challenge')) {
        return this.#actionStore.get('two-factor-challenge')!
      }

      const twoFactorChallenge = new TwoFactorAuthController(this.app)

      return async (context, data) => twoFactorChallenge.show(context, data)
    } catch {
      return async () => this.#catching()
    }
  }

  public getVerifyEmailRenderer(): CallbackAction<VerifyEmailProps> {
    try {
      if (this.#actionStore.has('verify-email')) {
        return this.#actionStore.get('verify-email')!
      }

      const verifyEmail = new VerifyEmailController(this.app)

      return async (context, data) => verifyEmail.show(context, data)
    } catch {
      return async () => this.#catching()
    }
  }

  public getLoginRenderer(): CallbackAction<LoginProps> {
    try {
      if (this.#actionStore.has('login')) {
        return this.#actionStore.get('login')!
      }

      const login = new LoginController(this.app)

      return async (context, data) => login.show(context, data)
    } catch {
      return async () => this.#catching()
    }
  }

  public getRegisterRenderer(): CallbackAction<RegisterProps> {
    try {
      if (this.#actionStore.has('register')) {
        return this.#actionStore.get('register')!
      }

      const register = new RegisterController(this.app)

      return async (context, data) => register.show(context, data)
    } catch {
      return async () => this.#catching()
    }
  }
}
