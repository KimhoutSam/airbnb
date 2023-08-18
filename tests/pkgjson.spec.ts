import { test } from '@japa/runner'
import * as sink from '@adonisjs/sink'

test.group('study about sink package.json', async () => {
  const pkg = new sink.files.PackageJsonFile(process.cwd())

  test('checking', async () => {
    console.log('@adonisjs/lucid' in pkg.get().devDependencies)
  }).skip(true)
})
