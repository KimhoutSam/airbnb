import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import * as sinkStatic from '@adonisjs/sink'

export default async function instructions(
  _projectRoot: string,
  _app: ApplicationContract,
  sink: typeof sinkStatic
) {
  const answer = await sink.getPrompt().multiple('start configuration rapid', [
    {
      name: 'as',
      hint: 'inertia or static or api (for now only static)',
      disabled: false,
      message: 'install application as inertia or static or api',
    },
  ])

  console.log(answer)
}
