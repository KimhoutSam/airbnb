import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import * as sink from '@adonisjs/sink'
import { Algorithem, Features } from './enum'
import { DataType } from 'csstype'
import User from 'Rapid/Models/User'

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
    /**
     * degit of number
     */
    degit: 6 | 8
    /**
     * period of renew
     */
    period: 30 | 60
    /**
     * qrcode color
     */
    color: {
      background: DataType.NamedColor
      text: DataType.NamedColor
    }
    /**
     * display user in authenticator
     */
    display(user: User): string
  }
  /**
   * allow feature
   */
  features: Features[]
}
