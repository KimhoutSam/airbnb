import type { InstructionsParameter } from 'adonis-rapid/instructions'
import { version } from './semver'

export default function instructions(...args: InstructionsParameter) {
  const [root, app, sink] = args

  if (version.includes('preview')) {
    const release = sink.logger.colors.bold(sink.logger.colors.yellow('^0.2.0'))
    const warning = sink.logger.colors.bold(sink.logger.colors.yellow('^0.1.5-preview-5'))

    sink.logger.warning(
      `rewrite package please wait for "${release}" or your app will be broken if you wanted to see it work as presentation please install "${warning}"`
    )
  }
}
