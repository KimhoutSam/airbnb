import { test } from '@japa/runner'
import { copy } from '../src/utils'

test('copy from dir to dest', async () => {
  copy({
    root: __dirname,
    destination: `root`,
    source: `static-js`,
    extension: {
      from: '.txt',
      to: '',
      exception: true,
    },
    logger(logger, { root, destination }) {
      logger.warning(`look like you had "${root}/${destination}"`)
      logger.logUpdate(`"${root}/${destination}" => "${root}/old_${destination}"`)
    },
  })
}).skip(true)
