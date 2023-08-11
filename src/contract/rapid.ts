declare module 'adonis-rapid' {
  import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

  interface ControllerConstruct<TController> {
    new (): TController
  }

  interface MiddlewareConstruct<TMiddleware> {
    new (): TMiddleware
  }

  type CallbackAction<TData = {}> = (
    context: HttpContextContract,
    data: TData
  ) => any | Promise<any>

  type RendererKey = 'login' | 'register'

  interface RapidConfig {
    types: 'inertia' | 'static'
    features: import('../types').Features[]
  }

  interface RapidConfiguratorContract {
    config: RapidConfig

    getLoginRenderer(): CallbackAction<{
      rapid: {
        password: any
        uid: any
      }
    }>

    getRegisterRenderer(): CallbackAction<{
      rapid: {
        password: any
        uid: any
        confirm: any
      }
    }>

    LoginRenderer(
      action: CallbackAction<{
        rapid: {
          password: any
          uid: any
        }
      }>
    ): void

    RegisterRenderer(
      action: CallbackAction<{
        rapid: {
          password: any
          uid: any
          confirm: any
        }
      }>
    ): void
  }
}

declare module '@ioc:Adonis/Core/Application' {
  import { RapidConfiguratorContract } from 'adonis-rapid'

  interface ContainerBindings {
    'SH8GH/Rapid/Configurator': RapidConfiguratorContract
  }
}
