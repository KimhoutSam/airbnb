import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import * as sink from '@adonisjs/sink'
import { Algorithem, Features } from './enum'

type SinkStatic = typeof sink

export type InstructionsParameter = [
  projectRoot: string,
  app: ApplicationContract,
  sink: SinkStatic,
]

export type RapidConfiguration = {
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
     * allow name register alpha numberic
     */
    nameAllow: ('dash' | 'underscore' | 'space')[]
  }
  /**
   * allow feature
   */
  features: Features[]
}
