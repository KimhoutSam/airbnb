import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import * as sinkStatic from '@adonisjs/sink'

export default async function instructions(
  projectRoot: string,
  app: ApplicationContract,
  sink: typeof sinkStatic
) {
  const {
    files,
    getPrompt,
    instructions,
    isInteractive,
    logger,
    sinkVersion,
    sticker,
    supportsColors,
    table,
    tasks,
    tasksUi,
    testingRenderer,
    utils,
  } = sink

  const packagedotjson = new files.PackageJsonFile(projectRoot)
}
