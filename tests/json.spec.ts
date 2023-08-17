import { test } from '@japa/runner'
import { packageDotJson } from '../src/utils'

test('package.json', () => {
  console.log(packageDotJson())
})
