declare module 'adonis-rapid' {
  import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
  import { DateTime } from 'luxon'
  import { column, beforeSave, BaseModel, LucidModel } from '@ioc:Adonis/Lucid/Orm'

  class User extends BaseModel {
    public id: number
    public email: string
    public password: string
    public name: string
    public avatar: null | string
    public avatar_url: null | string
    public rememberMeToken: string | null
    public twoFactorEnable: boolean | null
    public twoFactorRecoveryCode: string | null
    public twoFactorCode: string | null
    public createdAt: DateTime
    public updatedAt: DateTime
    public static generateAvatar(user: User): Promise<void>
    public static hashPassword(user: User): Promise<void>
  }

  type UserModel = typeof User

  type LoginProps = {
    rapid: {
      password: string
      uid: string
    }
    hasRegisterLink: boolean
    hasForgotPasswordLink: boolean
  }

  type RegisterProps = {
    rapid: {
      password: string
      uid: string
      confirm: string
      name: string
    }
  }

  type VerifyEmailProps = {
    rapid: {
      email: string
    }
  }

  type TwoFactorChallengeProps = {
    rapid: {}
  }

  type ResetPasswordProps = {
    rapid: {}
  }

  type ForgotPasswordProps = {
    rapid: {}
  }

  type CallbackAction<TData = {}> = (
    context: HttpContextContract,
    data: TData
  ) => any | Promise<any>

  type RendererKey =
    | 'login'
    | 'register'
    | 'verify-email'
    | 'two-factor-challenge'
    | 'reset-password'
    | 'forgot-password'

  interface RapidConfig {
    type: 'inertia' | 'static' | 'api'
    settings: {}
    features: import('../types').Features[]
  }

  interface RapidConfiguratorContract {
    /**
     * core config
     */
    config: RapidConfig

    /**
     * get `/login` action for route should run
     */
    getLoginRenderer(): CallbackAction<LoginProps>
    /**
     * get `/forgot-password` action for route should run
     */
    getForgotPasswordRenderer(): CallbackAction<ForgotPasswordProps>

    /**
     * get `/reset-password` action for route should run
     */
    getResetPasswordRenderer(): CallbackAction<ResetPasswordProps>

    /**
     * get `/two-factor-challenge` action for route should run
     */
    getTwoFactorChallengeRenderer(): CallbackAction<TwoFactorChallengeProps>

    /**
     * get `/verify-email` action for route should run
     */
    getVerifyEmailRenderer(): CallbackAction<VerifyEmailProps>

    /**
     * get `/register` action for route should run
     */
    getRegisterRenderer(): CallbackAction<RegisterProps>

    /**
     * to map `/login` route should run
     */
    LoginRenderer(action: CallbackAction<LoginProps>): void

    /**
     * to map `/forgot-password` route should run
     */
    ForgotPasswordRenderer(action: CallbackAction<ForgotPasswordProps>): void

    /**
     * to map `/reset-password` route should run
     */
    ResetPasswordRenderer(action: CallbackAction<ResetPasswordProps>): void

    /**
     * to map `/two-factor-challenge` route should run
     */
    TwoFactorChallengeRenderer(action: CallbackAction<TwoFactorChallengeProps>): void

    /**
     * to map `/verify-email` route should run
     */
    VerifyEmailRenderer(action: CallbackAction<VerifyEmailProps>): void

    /**
     * to map `/register` route should run
     */
    RegisterRenderer(action: CallbackAction<RegisterProps>): void
  }
}

declare module '@ioc:Adonis/Core/Application' {
  import { RapidConfiguratorContract } from 'adonis-rapid'

  interface ContainerBindings {
    'SH8GH/Rapid/Configurator': Omit<
      RapidConfiguratorContract,
      `getpublic ${string}Renderer` | 'config'
    >
  }
}
