declare module 'adonis-rapid/instructions' {
  import { ApplicationContract } from '@ioc:Adonis/Core/Application'
  import * as sink from '@adonisjs/sink'

  type SinkStatic = typeof sink

  type InstructionsParameter = [projectRoot: string, app: ApplicationContract, sink: SinkStatic]

  type RapidConfiguration = {
    /**
     * stack for application use
     */
    stack: 'static' | 'inertia' | 'api'
    /**
     * authentication settings
     */
    settings: {
      /**
       * set sha algorithem for 2fa
       */
      sha: import('./enum').Algorithem
      /**
       * allow register alpha numberic
       */
      nameAllow: ('dash' | 'underscore' | 'space')[]
    }
    /**
     * allow feature
     */
    features: import('./enum').Features[]
  }
}
