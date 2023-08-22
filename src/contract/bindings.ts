declare module '@ioc:Adonis/Core/Application' {
  import { CoreUserModel } from 'adonis-rapid/models'
  import { CoreForgotPasswordValidator, CoreLoginValidator } from 'adonis-rapid/validator'

  interface ContainerBindings {
    'SH8GH/Rapid/Core': {
      UserModel: typeof CoreUserModel
      ForgotPasswordValidator: typeof CoreForgotPasswordValidator
      LoginValidator: typeof CoreLoginValidator
    }
  }
}

declare module '@ioc:SH8GH/Rapid/Core' {
  import { CoreUserModel } from 'adonis-rapid/models'
  import { CoreForgotPasswordValidator, CoreLoginValidator } from 'adonis-rapid/validator'

  const root: {
    UserModel: typeof CoreUserModel
    ForgotPasswordValidator: typeof CoreForgotPasswordValidator
    LoginValidator: typeof CoreLoginValidator
  }

  export default root
}
