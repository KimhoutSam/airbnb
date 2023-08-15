import type { InstructionsParameter } from 'adonis-rapid/instructions'
import { version } from './semver'

export default function instructions(...args: InstructionsParameter) {
  const [root, app, sink] = args

  if (version.includes('preview')) {
    sink.logger.warning('rewrite package please wait for 1.0.0-preview or your app will be broken')
  }
}
