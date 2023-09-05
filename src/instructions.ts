import type { InstructionsParameter } from './contract/instructions'
import path from 'path'
import { copy, install, move } from './utils'

export default async function instructions(...args: InstructionsParameter) {
  const [, app, sink] = args

  /**
   * adonis-rapid package.json
   */
  const $pkg = new sink.files.PackageJsonFile(path.join(__dirname, '..', '..'))

  /**
   * application rc
   */
  const rc = new sink.files.AdonisRcFile(app.makePath())

  /**
   * application tsconfig
   */
  const tsc = new sink.files.JsonFile(app.makePath(), 'tsconfig.json')

  rc.setAlias('Rapid', path.join('node_modules', 'adonis-rapid', 'build', 'src', 'app'))
  rc.commit()
  sink.logger.info('Add Rapid Namespace')

  const defaultPaths: Record<string, [string]> = tsc.get().compilerOptions.paths
  tsc.set('compilerOptions.paths', {
    ...defaultPaths,
    Rapid: [path.join('node_modules', 'adonis-rapid', 'build', 'src', 'app')],
  })
  tsc.commit()
  sink.logger.info('Add Rapid Path In Tsconfig')

  sink.logger.info('|-----------------------------------------------------|')
  sink.logger.info('|                                                     |')
  sink.logger.info('| For Best DX on Mailer Testing I Recommend "Mailpit" |')
  sink.logger.info('|          https://github.com/axllent/mailpit         |')
  sink.logger.info('|                                                     |')
  sink.logger.info('|-----------------------------------------------------|')

  // check if that was preview
  if ($pkg.get('version').includes('preview')) {
    const release1 = sink.logger.colors.bold(sink.logger.colors.yellow('x.x.x-cjs-stable'))
    const release2 = sink.logger.colors.bold(sink.logger.colors.yellow('x.x.x-esm-stable'))
    const warning = sink.logger.colors.bold(sink.logger.colors.yellow($pkg.get('version')))

    sink.logger.warning(
      `rewrite package please wait for "${release1}" or "${release2}" then your app will be broken or you wanted to see it work as presentation please install "${warning}" to preview`
    )
  }

  await install(
    app.makePath(),
    {
      name: '@adonisjs/view',
      dev: false,
      version: '^6.2.0',
    },
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
    },
    {
      name: 'color',
      version: '^4.2.3',
      dev: false,
    },
    {
      name: '@types/color',
      version: '^3.0.4',
      dev: true,
    }
  )

  const prompt = sink.getPrompt()

  const stack = await prompt.choice(
    'what client stack you wanted use?',
    [
      'js-static',
      'js-inertia-svelte',
      'js-inertia-react',
      'js-inertia-vue',
      'js-api',
      'ts-static',
      'ts-inertia-svelte',
      'ts-inertia-react',
      'ts-inertia-vue',
      'ts-api',
    ],
    {
      default: 'js-static',
    }
  )

  const replaceResources = await prompt.choice(
    'do you want to copy default rapid views?',
    ['yes', 'no'],
    {
      default: 'no',
    }
  )

  if (replaceResources === 'yes' && stack === 'js-static') {
    await move(`${__dirname}/stubs/resources-js`, app.makePath('resources'), {
      txt: '',
    })
  }

  await copy(`${__dirname}/stubs/rapid.ts.txt`, app.configPath('rapid.ts'), {
    stack: `'${stack}'`,
  })
}
