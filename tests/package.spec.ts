import { test } from '@japa/runner'
import * as sink from '@adonisjs/sink'
import path from 'node:path'

test('package.json', async () => {
  const $pkg = new sink.files.PackageJsonFile(path.join(__dirname, '..'))

  console.log('helo', $pkg.get('version'))
})
