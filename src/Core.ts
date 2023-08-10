import { RapidConfig, RapidCoreContract } from 'adonis-rapid'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class Core implements RapidCoreContract {
  constructor(
    public config: RapidConfig,
    public app: ApplicationContract
  ) {}
}
