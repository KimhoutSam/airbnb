import { test } from '@japa/runner'
import generator from 'totp-generator'
import authenticator from 'authenticator'
import qrcode from 'qrcode'
import '../src/contract/index'

test('totp test', ({ expect }) => {
  const code = generator('DLOTQLMIOJ3DDKQU')
  console.log(code)
}).skip
