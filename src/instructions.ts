import type { InstructionsParameter } from 'adonis-rapid/instructions'
import path from 'path'
import { copy, install, move } from './utils'

export default async function instructions(...args: InstructionsParameter) {
  const [, app, sink] = args

  /**
   * adonis-rapid package.json
   */
  const $pkg = new sink.files.PackageJsonFile(path.join(__dirname, '..'))

  sink.logger.info('|-----------------------------------------------------|')
  sink.logger.info('|                                                     |')
  sink.logger.info('| For Best DX on Mailer Testing I Recommend "Mailpit" |')
  sink.logger.info('|          https://github.com/axllent/mailpit         |')
  sink.logger.info('|                                                     |')
  sink.logger.info('|-----------------------------------------------------|')

  // check if that was preview
  if ($pkg.get('version').includes('preview')) {
    const release = sink.logger.colors.bold(sink.logger.colors.yellow('^0.2.0-cjs'))
    const warning = sink.logger.colors.bold(sink.logger.colors.yellow('^0.1.5-preview-5'))

    sink.logger.warning(
      `rewrite package please wait for "${release}" then your app will be broken or you wanted to see it work as presentation please install "${warning}" to preview`
    )
  }

  await install(
    app.makePath(),
    {
      dev: false,
      name: '@adonisjs/lucid',
      version: '^18.4.0',
    },
    {
      name: '@adonisjs/auth',
      version: '^8.2.3',
      dev: false,
    },
    {
      name: '@adonisjs/mail',
      version: '^8.2.1',
      dev: false,
    },
    {
      name: 'generate-avatar',
      version: '^1.1.5',
      dev: false,
    },
    {
      name: 'qrcode',
      version: '^1.1.5',
      dev: false,
    },
    {
      name: '@types/qrcode',
      version: '^1.5.1',
      dev: true,
    },
    {
      name: 'authenticator',
      version: '^1.1.5',
      dev: false,
    },
    {
      name: '@types/authenticator',
      version: '^1.1.1',
      dev: true,
    }
  )

  const prompt = sink.getPrompt()

  const stack = await prompt.choice('what client stack you wanted use?', [
    'static',
    'inertia',
    'api',
  ])

  await move(`${__dirname}/stubs/resources`, app.makePath('resources'), {
    txt: '',
  })

  // resources folder
  await copy(`${__dirname}/stubs/rapid.ts.txt`, app.configPath('rapid.ts'), {
    stack: `'${stack}'`,
  })
}
