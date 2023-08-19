declare module '@ioc:SH8GH/Rapid/UserModel' {
  import { DateTime } from 'luxon'
  import { BaseModel } from '@ioc:Adonis/Lucid/Orm'

  class User extends BaseModel {
    public id: number
    public email: string
    public password: string
    public name: string
    public emailVerifiedAt: DateTime
    public emailVerified: boolean
    public avatar: string | null
    public avatar_url: string | null
    public twoFactorEnable: boolean
    public twoFactorRecoveryCode: string | null
    public twoFactorCode: string | null
    public rememberMeToken: string | null
    public createdAt: DateTime
    public updatedAt: DateTime
    public static defaultFromRapid(user: User): Promise<void>
  }
}

declare module '@ioc:Adonis/Core/Application' {
  import User from '@ioc:SH8GH/Rapid/UserModel'

  interface ContainerBindings {
    'SH8GH/Rapid/UserModel': typeof User
  }
}

declare module 'adonis-rapid/models' {
  import { User } from '@ioc:SH8GH/Rapid/UserModel'

  type BaseExtendsModel = typeof User
}
