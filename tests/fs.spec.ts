import { test } from '@japa/runner'
import { move } from '../src/utils'

test.group('fs system', () => {
  test('move in test dir to dest dir', async () => {
    move(`${process.cwd()}/src/stubs/resources-js`, `${__dirname}/resources`, { txt: '' })
  }).skip(true)
})
