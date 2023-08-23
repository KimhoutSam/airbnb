declare module '@ioc:Adonis/Core/Application' {
  import { CoreUserModel } from 'adonis-rapid/models'
  import {
    CoreForgotPasswordValidator,
    CoreLoginValidator,
    CoreRegisterValidator,
    CoreUserDeleteValidator,
    CoreVerifyEmailValidator,
    CoreVerifyingValidator,
  } from 'adonis-rapid/validator'

  interface ContainerBindings {
    'SH8GH/Rapid/Core': {
      UserModel: typeof CoreUserModel
      ForgotPasswordValidator: typeof CoreForgotPasswordValidator
      LoginValidator: typeof CoreLoginValidator
      RegisterValidator: typeof CoreRegisterValidator
      UserDeleteValidator: typeof CoreUserDeleteValidator
      VerifyEmailValidator: typeof CoreVerifyEmailValidator
      VerifyingValidator: typeof CoreVerifyingValidator
    }
  }
}

declare module '@ioc:SH8GH/Rapid/Core' {
  import { CoreUserModel } from 'adonis-rapid/models'
  import {
    CoreForgotPasswordValidator,
    CoreLoginValidator,
    CoreRegisterValidator,
    CoreUserDeleteValidator,
    CoreVerifyEmailValidator,
    CoreVerifyingValidator,
  } from 'adonis-rapid/validator'

  const root: {
    UserModel: typeof CoreUserModel
    ForgotPasswordValidator: typeof CoreForgotPasswordValidator
    LoginValidator: typeof CoreLoginValidator
    RegisterValidator: typeof CoreRegisterValidator
    UserDeleteValidator: typeof CoreUserDeleteValidator
    VerifyEmailValidator: typeof CoreVerifyEmailValidator
    VerifyingValidator: typeof CoreVerifyingValidator
  }

  export default root
}
