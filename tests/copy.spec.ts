import { test } from '@japa/runner'
import { copy } from '../src/utils'

test('copy from dir to dest', async () => {
  copy(`${process.cwd()}/src/stubs/rapid.ts.txt`, `${__dirname}/rapid.ts`, { stack: "'inertia'" })
})
