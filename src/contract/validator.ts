declare module 'adonis-rapid/validator' {
  import { ParsedTypedSchema, SchemaLiteral, CustomMessages } from '@ioc:Adonis/Core/Validator'
  import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

  class CoreForgotPasswordValidator {
    protected ctx: HttpContextContract
    public schema: ParsedTypedSchema<{
      email: {
        t: string
        getTree(): SchemaLiteral
      }
    }>
    public messages: CustomMessages
  }

  class CoreLoginValidator {
    protected ctx: HttpContextContract
    public schema: ParsedTypedSchema<{
      uid: {
        t: string
        getTree(): SchemaLiteral
      }
      password: {
        t: string
        getTree(): SchemaLiteral
      }
      remember: {
        t?: boolean | undefined
        getTree(): SchemaLiteral
      }
    }>

    public messages: CustomMessages
  }

  class CoreRegisterValidator {
    protected ctx: HttpContextContract
    public schema: ParsedTypedSchema<{
      uid: {
        t: string
        getTree(): SchemaLiteral
      }
      name: {
        t: string
        getTree(): SchemaLiteral
      }
      password: {
        t: string
        getTree(): SchemaLiteral
      }
      password_confirmation: {
        t: string
        getTree(): SchemaLiteral
      }
    }>
    public messages: CustomMessages
  }
}
