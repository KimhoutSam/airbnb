import { Syntax } from 'adonis-rapid/enum'
import type { InstructionsParameter } from 'adonis-rapid/instructions'
import fs from 'fs-extra'
import path from 'path'

export default async function instructions(...args: InstructionsParameter) {
  const [, app, sink] = args

  const pkg = new sink.files.PackageJsonFile(app.makePath())
  const $pkg = new sink.files.PackageJsonFile(path.join(__dirname, '..'))

  // check if that was preview
  if ($pkg.get().version.includes('preview')) {
    const release = sink.logger.colors.bold(sink.logger.colors.yellow('^0.2.0-cjs'))
    const warning = sink.logger.colors.bold(sink.logger.colors.yellow('^0.1.5-preview-5'))

    sink.logger.warning(
      `rewrite package please wait for "${release}" then your app will be broken or you wanted to see it work as presentation please install "${warning}" to preview`
    )
  }

  if (!('@adonisjs/lucid' in pkg.get().devDependencies)) {
    pkg.beforeInstall(() => {
      sink.logger.log('install "@adonisjs/lucid" database')
    })

    pkg.install('@adonisjs/lucid', '^18.4.0', false)

    sink.logger.success('installed "@adonisjs/lucid" database, wait for setup')
  }

  if (!('@adonisjs/auth' in pkg.get().devDependencies)) {
    pkg.beforeInstall(() => {
      sink.logger.log('install "@adonisjs/auth" authenticate')
    })

    pkg.install('@adonisjs/auth', '^8.2.3', false)

    sink.logger.success('installed "@adonisjs/auth" authenticate, wait for setup')
  }

  if (!('@adonisjs/mail' in pkg.get().devDependencies)) {
    pkg.beforeInstall(() => {
      sink.logger.log('install "@adonisjs/mail" mailing')
    })

    pkg.install('@adonisjs/mail', '^8.2.1', false)

    sink.logger.success('installed "@adonisjs/mail" mailing, wait for setup')
  }

  if (!('authenticator' in pkg.get().devDependencies)) {
    pkg.beforeInstall(() => {
      sink.logger.log('install "authenticator" generating code to two factor auth')
    })

    pkg.install('authenticator', '^1.1.5', false)
    pkg.install('@types/authenticator', '^1.1.1', true)

    sink.logger.success(
      'installed "authenticator" generating code to two factor auth, wait for setup'
    )
  }

  if (!('qrcode' in pkg.get().devDependencies)) {
    pkg.beforeInstall(() => {
      sink.logger.log('install "qrcode" generating qrcode')
    })

    pkg.install('qrcode', '^1.1.5', false)
    pkg.install('@types/qrcode', '^1.5.1', true)

    sink.logger.success('installed "qrcode" generating qrcode, wait for setup')
  }

  if (!('totp-generator' in pkg.get().devDependencies)) {
    pkg.beforeInstall(() => {
      sink.logger.log('install "totp-generator" testing two factor auth')
    })

    pkg.install('totp-generator', '^1.1.5', false)
    pkg.install('@types/totp-generator', '^0.0.5', true)

    sink.logger.success('installed "totp-generator" testing two factor auth, wait for setup')
  }

  const prompt = sink.getPrompt()

  const syntax = await prompt.choice('what client syntax you use?', ['javascript', 'typeScript'], {
    default: 'javascript',
    hint: 'javascript',
    result(value) {
      if (value === 'javascript' || value === 'typeScript') {
        return value
      }
      return 'javascript'
    },
  })

  const types = await prompt.choice(
    'what client types you use?',
    [
      {
        name: 'static',
      },
      {
        name: 'inertia-vue',
      },
      {
        name: 'inertia-react',
      },
      {
        name: 'inertia-svelte',
      },
      {
        name: 'api',
      },
    ],
    {
      result(value) {
        if (
          value === 'static' ||
          value === 'inertia-vue' ||
          value === 'inertia-react' ||
          value === 'inertia-svelte' ||
          value === 'api'
        ) {
          return value
        }
        return 'static'
      },
    }
  )

  if (fs.existsSync(app.makePath('_resources'))) {
    sink.logger.warning('look like your app have "resources" folder')
    await fs.move(app.makePath('resources'), app.makePath('_resources'))
    sink.logger.success(
      `{${sink.logger.colors.white(app.makePath('resources'))} => ${sink.logger.colors.white(
        app.makePath('_resources')
      )}}`,
      'moved'
    )
  }
}
