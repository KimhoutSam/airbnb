declare module 'adonis-rapid/instructions' {
  import { Algorithem, Features, RapidType, Syntax } from 'adonis-rapid/enum'
  import { ApplicationContract } from '@ioc:Adonis/Core/Application'
  import * as sink from '@adonisjs/sink'

  type SinkStatic = typeof sink

  type InstructionsParameter = [projectRoot: string, app: ApplicationContract, sink: SinkStatic]

  type RapidConfiguration = {
    type: RapidType
    syntax: Syntax
    settings: {
      sha: Algorithem
    }
    features: Features[]
  }
}
