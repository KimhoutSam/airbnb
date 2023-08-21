import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class RapidProvider {
  constructor(public app: ApplicationContract) {
    console.log('not adding anything yet')
  }
}
