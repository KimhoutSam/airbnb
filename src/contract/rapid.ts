declare module 'adonis-rapid' {
  import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

  enum Features {
    enableLoginView = 'enable-login-view',
  }

  type CallbackAction<TData = {}> = (context: HttpContextContract, data: TData) => any

  interface RapidConfig {
    types: 'inertia' | 'static'
    features: Features[]
  }

  interface RapidCoreContract {
    config: RapidConfig
  }
}

declare module '@ioc:Adonis/Core/Application' {
  import { RapidCoreContract } from 'adonis-rapid'

  interface ContainerBindings {
    'SH8GH/Rapid/Core': RapidCoreContract
  }
}
