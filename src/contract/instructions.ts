declare module 'adonis-rapid/instructions' {
  import { Algorithem, Features } from 'adonis-rapid/enum'
  import { ApplicationContract } from '@ioc:Adonis/Core/Application'
  import * as sink from '@adonisjs/sink'

  type SinkStatic = typeof sink

  type InstructionsParameter = [projectRoot: string, app: ApplicationContract, sink: SinkStatic]

  type RapidConfiguration = {
    stack: 'edge' | 'inertia' | 'api'
    settings: {
      sha: Algorithem
    }
    features: Features[]
  }
}
