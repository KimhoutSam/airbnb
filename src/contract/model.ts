declare module '@ioc:SH8GH/Rapid/UserModel' {
  import { BaseModel } from '@ioc:Adonis/Lucid/Orm'

  class User extends BaseModel {
    public name: string

    public email: string

    public password: string
  }

  export default User
}

declare module '@ioc:Adonis/Core/Application' {
  import User from '@ioc:SH8GH/Rapid/UserModel'

  interface ContainerBindings {
    'SH8GH/Rapid/UserModel': typeof User
  }
}

declare module 'adonis-rapid/models' {
  import User from '@ioc:SH8GH/Rapid/UserModel'

  type BaseExtendsModel = typeof User
}
