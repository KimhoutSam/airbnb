import { BaseModel, column, beforeSave } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public firstName: string

  @column()
  public lastName: string

  @column()
  public middleName: string | null

  @column()
  public emailVerifiedAt: DateTime

  @column()
  public emailVerified: boolean

  @column()
  public avatar: string | null

  @column()
  public avatar_url: string | null

  @column()
  public twoFactorEnable: boolean

  @column()
  public twoFactorRecoveryCode: string | null

  @column()
  public twoFactorCode: string | null

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public getName() {
    return [this.firstName, this.middleName, this.lastName].join(' ')
  }

  @beforeSave()
  public static async defaultFromRapid(user: User) {
    if (user.avatar === null) {
      const { generateFromString } = await import('generate-avatar')

      user.avatar = `data:image/svg+xml;utf8,${generateFromString(user.getName())}`
    }

    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
