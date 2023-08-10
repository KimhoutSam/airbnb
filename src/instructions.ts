import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import * as sinkStatic from '@adonisjs/sink'

export default async function instructions(
  projectRoot: string,
  app: ApplicationContract,
  sink: typeof sinkStatic
) {
  console.log({ projectRoot, sink, app })
}
