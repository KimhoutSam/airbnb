import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import * as sinkStatic from '@adonisjs/sink'

/**
 * create rapid config in application
 */
async function createStaticInstructions(
  projectRoot: string,
  app: ApplicationContract,
  sink: typeof sinkStatic,
  types: 'static' | 'inertia' | 'api'
) {
  const path = require('node:path')

  const configDirectory = app.directoriesMap.get('config') || 'config'
  const configPath = path.join(configDirectory, 'rapid.ts')

  const template = new sink.files.MustacheFile(
    projectRoot,
    configPath,
    path.join(__dirname, 'stubs', `rapid.${types}.config.txt`)
  )

  template.commit()
}

export default async function instructions(
  projectRoot: string,
  app: ApplicationContract,
  sink: typeof sinkStatic
) {
  const installAs = (await sink
    .getPrompt()
    .ask('start configuration rapid as inertia, static, api?', {
      name: 'as',
      hint: 'inertia or static or api (for now only static)',
      default: 'static',
      async validate(value) {
        if (value === 'static') {
          return true
        }
        if (value === 'inertia') {
          return true
        }
        if (value === 'api') {
          return true
        }
        return false
      },
    })) as 'static' | 'inertia' | 'api'

  if (installAs === 'static') {
    return createStaticInstructions(projectRoot, app, sink, installAs)
  }
}
