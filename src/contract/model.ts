declare module '@ioc:Adonis/Core/Application' {
  import { User } from 'adonis-rapid/models'

  interface ContainerBindings {
    'SH8GH/Rapid/Core': {
      UserModel: typeof User
    }
  }
}

declare module '@ioc:SH8GH/Rapid/Core' {
  import { User } from 'adonis-rapid/models'

  const root: {
    UserModel: typeof User
  }

  export default root
}

declare module 'adonis-rapid/models' {
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
