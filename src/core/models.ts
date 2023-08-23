import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { CoreAbstraction } from 'adonis-rapid/instructions'
import { CoreUserModel } from 'adonis-rapid/models'
import { DateTime } from 'luxon'

/**
 * returing user models class
 */
export const HOFRapidUserModels: CoreAbstraction<typeof CoreUserModel> = (
  application: ApplicationContract
) => {
  const { BaseModel, column, beforeSave } = application.container.use('Adonis/Lucid/Orm')
  const Hash = application.container.use('Adonis/Core/Hash')

  class User extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public email: string

    @column({ serializeAs: null })
    public password: string

    @column()
    public name: string

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

    @beforeSave()
    public static async defaultFromRapid(user: User) {
      if (user.avatar === null) {
        const { generateFromString } = await import('generate-avatar')

        user.avatar = `data:image/svg+xml;utf8,${generateFromString(user.name)}`
      }

      if (user.$dirty.password) {
        user.password = await Hash.make(user.password)
      }
    }
  }

  return User
}
