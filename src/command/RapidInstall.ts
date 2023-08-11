import { BaseCommand, args } from '@adonisjs/core/build/standalone'

export default class RapidInstall extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'rapid:install'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = 'install auth, database, inertia, ...many more.'

  @args.string({
    name: 'template',
    required: false,
    description: 'setup as inertia or static or api (right now only static)',
  })
  public template: 'static' | 'inertia' | 'api' = 'static'

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command. Don't forget to call `node ace generate:manifest`
     * afterwards.
     */
    loadApp: false,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process. Don't forget to call
     * `node ace generate:manifest` afterwards.
     */
    stayAlive: false,
  }

  public async run() {
    if (this.template === 'static') {
      this.application.configPath('')
    }
  }
}
