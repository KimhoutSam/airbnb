declare module '@sh8gh/adonis-rapid' {
  import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
  enum Features {}

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
  import { RapidCoreContract } from '@sh8gh/adonis-rapid'

  interface ContainerBindings {
    'SH8GH/Rapid/Core': RapidCoreContract
  }
}
