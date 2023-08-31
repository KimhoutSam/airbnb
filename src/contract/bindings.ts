declare module '@ioc:Adonis/Core/Application' {
  import { Inertia } from '@eidellev/inertia-adonisjs/src/Inertia'
  import InertiaMiddleware from '@eidellev/inertia-adonisjs/middleware/Inertia'
  type TypeofRapidConfigurator = (typeof import('../RapidConfigurator'))['default']
  type RapidConfigurator = TypeofRapidConfigurator['prototype']

  interface ContainerBindings {
    'EidelLev/Inertia/Middleware': typeof InertiaMiddleware
    'EidelLev/Inertia': {
      share: typeof Inertia.share
      version: typeof Inertia.version
      manifestFile: typeof Inertia.manifestFile
      lazy: typeof Inertia.lazy
    }
    'SH8GH/Rapid/Configurator': RapidConfigurator
  }
}
