declare module 'adonis-rapid/instructions' {
  import { Algorithem, Features } from 'adonis-rapid/enum'
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
      sha: Algorithem
      /**
       * allow register alpha numberic
       */
      nameAllow: ('dash' | 'underscore' | 'space')[]
    }
    /**
     * allow feature
     */
    features: Features[]
  }

  type CoreAbstraction<TReturns> = (app: ApplicationContract) => TReturns
}
