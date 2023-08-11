declare module '@ioc:SH8GH/Rapid/Core' {
  import { Controllers, Middlewares } from 'adonis-rapid'

  const root: Controllers & Middlewares

  export default root
}

declare module '@ioc:Adonis/Core/Application' {
  import InertiaMiddleware from '@eidellev/inertia-adonisjs/build/middleware/Inertia'
  import { Inertia } from '@eidellev/inertia-adonisjs/build/src/Inertia'
  import { Controllers, Middlewares } from 'adonis-rapid'

  interface ContainerBindings {
    'SH8GH/Rapid/Core': Controllers & Middlewares
    'EidelLev/Inertia/Middleware': InertiaMiddleware
    'EidelLev/Inertia': {
      lazy: typeof Inertia.lazy
      share: typeof Inertia.share
      version: typeof Inertia.version
      manifestFile: typeof Inertia.manifestFile
    }
  }
}
