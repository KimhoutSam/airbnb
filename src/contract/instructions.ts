declare module 'adonis-rapid/instructions' {
  import { Features, RapidType } from 'adonis-rapid/enum'
  import { ApplicationContract } from '@ioc:Adonis/Core/Application'
  import * as sink from '@adonisjs/sink'

  type SinkStatic = typeof sink

  type InstructionsParameter = [projectRoot: string, app: ApplicationContract, sink: SinkStatic]

  type RapidConfiguration = {
    type: RapidType
    settings: {}
    features: Features[]
  }
}
