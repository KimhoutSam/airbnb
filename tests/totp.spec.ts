import { test } from '@japa/runner'
import { install } from '../src/utils'
import path from 'path'

test('pkg.json test', async ({}) => {
  await install(
    path.join(__dirname, '..'),
    {
      dev: false,
      name: 'react',
      version: 'latest',
    },
    {
      dev: false,
      name: 'react-dom',
      version: 'latest',
    }
  )
})
