import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import type { RapidConfig } from '@sh8gh/adonis-rapid'

export default class RapidProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings

    this.app.container.singleton('SH8GH/Rapid/Core', () => {
      const config = this.app.container.resolveBinding('Adonis/Core/Config')
      const rootConfig: RapidConfig = config.get('rapid', { features: [] })
      const { default: Core } = require('Src/Core')

      return new Core(rootConfig, this.app)
    })
  }

  public async boot() {
    // All bindings are ready, feel free to use them

    this.app.container.withBindings(['SH8GH/Rapid/Core', 'Adonis/Core/Route'], (Core, Route) => {
      Route.get('/test', () => Core)
    })
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
