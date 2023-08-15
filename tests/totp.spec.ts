import { test } from '@japa/runner'
import generator from 'totp-generator'
import authenticator from 'authenticator'
import qrcode from 'qrcode'
import '../src/contract/index'

test('totp test', ({ expect }) => {
  const formattedKey = authenticator.generateKey()
  authenticator.generateTotpUri(
    formattedKey,
    'sasmkimhout@gmail.com',
    'adonis-rapid',
    'SHA1',
    6,
    30
  )
}).skip
