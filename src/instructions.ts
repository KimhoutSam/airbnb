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

async function installPackage(
  projectRoot: string,
  sink: typeof sinkStatic,
  pkg: string,
  version: string,
  message: string
) {
  const packageDotJson = new sink.files.PackageJsonFile(projectRoot)

  const logger = sink.logger.await(message)

  if (!packageDotJson.getInstalls().list.includes(pkg)) {
    logger.start()
    await packageDotJson.install(pkg, version, false).commitAsync()
    logger.stop()
    return
  }

  return
}

export default async function instructions(
  projectRoot: string,
  app: ApplicationContract,
  sink: typeof sinkStatic
) {
  await installPackage(projectRoot, sink, '@adonisjs/lucid', '^18.4.0', 'install database')
  await installPackage(projectRoot, sink, '@adonisjs/auth', '^8.2.3', 'install auth')

  const installAs = (await sink.getPrompt().ask('setup config with inertia or static or api?', {
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
