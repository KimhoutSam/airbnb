import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { BaseExtendsModel } from 'adonis-rapid/models'

export default function HOCRapidBaseModels(application: ApplicationContract): BaseExtendsModel {
  const { BaseModel } = application.container.use('Adonis/Lucid/Orm')

  class User extends BaseModel {}

  return User as BaseExtendsModel
}
