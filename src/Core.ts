import { RapidConfig, RapidCoreContract } from '@sh8gh/adonis-rapid'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class Core implements RapidCoreContract {
  constructor(
    public config: RapidConfig,
    public app: ApplicationContract
  ) {}
}
