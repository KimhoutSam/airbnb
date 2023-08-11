declare module '@ioc:Adonis/Core/Application' {
  import InertiaMiddleware from '@eidellev/inertia-adonisjs/build/middleware/Inertia'
  import { Inertia } from '@eidellev/inertia-adonisjs/build/src/Inertia'

  interface ContainerBindings {
    'EidelLev/Inertia/Middleware': InertiaMiddleware
    'EidelLev/Inertia': {
      lazy: typeof Inertia.lazy
      share: typeof Inertia.share
      version: typeof Inertia.version
      manifestFile: typeof Inertia.manifestFile
    }
  }
}
