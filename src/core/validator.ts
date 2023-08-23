import type { CoreAbstraction } from 'adonis-rapid/instructions'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import type { CustomMessages } from '@ioc:Adonis/Core/Validator'
import {
  CoreForgotPasswordValidator,
  CoreLoginValidator,
  CoreRegisterValidator,
  CoreUserDeleteValidator,
  CoreVerifyEmailValidator,
  CoreVerifyingValidator,
} from 'adonis-rapid/validator'

/**
 * returning ForgotPasswordValidator class
 */
export const HOFForgotPasswordValidator: CoreAbstraction<typeof CoreForgotPasswordValidator> = (
  application
) => {
  const { schema, rules } = application.container.use('Adonis/Core/Validator')

  class ForgotPassword {
    constructor(protected ctx: HttpContextContract) {}

    /*
     * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
     *
     * For example:
     * 1. The username must be of data type string. But then also, it should
     *    not contain special characters or numbers.
     *    ```
     *     schema.string({}, [ rules.alpha() ])
     *    ```
     *
     * 2. The email must be of data type string, formatted as a valid
     *    email. But also, not used by any other user.
     *    ```
     *     schema.string({}, [
     *       rules.email(),
     *       rules.unique({ table: 'users', column: 'email' }),
     *     ])
     *    ```
     */
    public schema = schema.create({
      email: schema.string({ escape: true, trim: true }, [rules.email()]),
    })

    /**
     * Custom messages for validation failures. You can make use of dot notation `(.)`
     * for targeting nested fields and array expressions `(*)` for targeting all
     * children of an array. For example:
     *
     * {
     *   'profile.username.required': 'Username is required',
     *   'scores.*.number': 'Define scores as valid numbers'
     * }
     *
     */
    public messages: CustomMessages = {}
  }

  return ForgotPassword as unknown as typeof CoreForgotPasswordValidator
}

/**
 * returning LoginValidator class
 */
export const HOFLoginValidator: CoreAbstraction<typeof CoreLoginValidator> = (application) => {
  const { schema, rules } = application.container.use('Adonis/Core/Validator')

  class LoginValidator {
    constructor(protected ctx: HttpContextContract) {}

    /*
     * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
     *
     * For example:
     * 1. The username must be of data type string. But then also, it should
     *    not contain special characters or numbers.
     *    ```
     *     schema.string({}, [ rules.alpha() ])
     *    ```
     *
     * 2. The email must be of data type string, formatted as a valid
     *    email. But also, not used by any other user.
     *    ```
     *     schema.string({}, [
     *       rules.email(),
     *       rules.unique({ table: 'users', column: 'email' }),
     *     ])
     *    ```
     */
    public schema = schema.create({
      uid: schema.string({ escape: true, trim: true }, [rules.email()]),
      password: schema.string({ escape: true, trim: true }),
      remember: schema.boolean.optional([]),
    })
    /**
     * Custom messages for validation failures. You can make use of dot notation `(.)`
     * for targeting nested fields and array expressions `(*)` for targeting all
     * children of an array. For example:
     *
     * {
     *   'profile.username.required': 'Username is required',
     *   'scores.*.number': 'Define scores as valid numbers'
     * }
     *
     */
    public messages: CustomMessages = {
      'uid.email': 'that was not in credentials',
    }
  }

  return LoginValidator as unknown as typeof CoreLoginValidator
}

/**
 * returning RegisterValidator class
 */
export const HOFRegisterValidator: CoreAbstraction<typeof CoreRegisterValidator> = (
  application
) => {
  const { schema, rules } = application.container.use('Adonis/Core/Validator')

  class RegisterValidator {
    constructor(protected ctx: HttpContextContract) {}

    /*
     * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
     *
     * For example:
     * 1. The username must be of data type string. But then also, it should
     *    not contain special characters or numbers.
     *    ```
     *     schema.string({}, [ rules.alpha() ])
     *    ```
     *
     * 2. The email must be of data type string, formatted as a valid
     *    email. But also, not used by any other user.
     *    ```
     *     schema.string({}, [
     *       rules.email(),
     *       rules.unique({ table: 'users', column: 'email' }),
     *     ])
     *    ```
     */
    public schema = schema.create({
      uid: schema.string({}, [rules.email(), rules.unique({ column: 'email', table: 'users' })]),
      name: schema.string({ escape: true, trim: true }, [rules.alpha({ allow: ['space'] })]),
      password: schema.string({ escape: true, trim: true }, [
        rules.minLength(8),
        rules.maxLength(16),
        rules.confirmed(),
      ]),
      password_confirmation: schema.string({ escape: true, trim: true }, []),
    })

    /**
     * Custom messages for validation failures. You can make use of dot notation `(.)`
     * for targeting nested fields and array expressions `(*)` for targeting all
     * children of an array. For example:
     *
     * {
     *   'profile.username.required': 'Username is required',
     *   'scores.*.number': 'Define scores as valid numbers'
     * }
     *
     */
    public messages: CustomMessages = {
      'uid.unique': 'email already exist',
      'uid.email': 'this input must be email',
      'name.alpha': 'just write your own name',
      'password.minLength': 'password must has atleast 8 length',
      'password.maxLength': 'password must has fewer than 17 length',
    }
  }

  return RegisterValidator as unknown as typeof CoreRegisterValidator
}

/**
 * returning UserDeleteValidator class
 */
export const HOFUserDeleteValidator: CoreAbstraction<typeof CoreUserDeleteValidator> = (
  application
) => {
  const { schema, rules } = application.container.use('Adonis/Core/Validator')

  class UserDeleteValidator {
    constructor(protected ctx: HttpContextContract) {}

    /*
     * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
     *
     * For example:
     * 1. The username must be of data type string. But then also, it should
     *    not contain special characters or numbers.
     *    ```
     *     schema.string({}, [ rules.alpha() ])
     *    ```
     *
     * 2. The email must be of data type string, formatted as a valid
     *    email. But also, not used by any other user.
     *    ```
     *     schema.string({}, [
     *       rules.email(),
     *       rules.unique({ table: 'users', column: 'email' }),
     *     ])
     *    ```
     */
    public schema = schema.create({
      email: schema.string({ escape: true, trim: true }, [rules.email()]),
    })

    /**
     * Custom messages for validation failures. You can make use of dot notation `(.)`
     * for targeting nested fields and array expressions `(*)` for targeting all
     * children of an array. For example:
     *
     * {
     *   'profile.username.required': 'Username is required',
     *   'scores.*.number': 'Define scores as valid numbers'
     * }
     *
     */
    public messages: CustomMessages = {}
  }

  return UserDeleteValidator as unknown as typeof CoreUserDeleteValidator
}

/**
 * returning VerifyEmailValidator class
 */
export const HOFVerifyEmailValidator: CoreAbstraction<typeof CoreVerifyEmailValidator> = (
  application
) => {
  const { schema, rules } = application.container.use('Adonis/Core/Validator')

  class VerifyEmailValidator {
    constructor(protected ctx: HttpContextContract) {}

    /*
     * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
     *
     * For example:
     * 1. The username must be of data type string. But then also, it should
     *    not contain special characters or numbers.
     *    ```
     *     schema.string({}, [ rules.alpha() ])
     *    ```
     *
     * 2. The email must be of data type string, formatted as a valid
     *    email. But also, not used by any other user.
     *    ```
     *     schema.string({}, [
     *       rules.email(),
     *       rules.unique({ table: 'users', column: 'email' }),
     *     ])
     *    ```
     */
    public schema = schema.create({
      email: schema.string({ escape: true, trim: true }, [rules.email()]),
    })

    /**
     * Custom messages for validation failures. You can make use of dot notation `(.)`
     * for targeting nested fields and array expressions `(*)` for targeting all
     * children of an array. For example:
     *
     * {
     *   'profile.username.required': 'Username is required',
     *   'scores.*.number': 'Define scores as valid numbers'
     * }
     *
     */
    public messages: CustomMessages = {
      email: 'that was not an email',
    }
  }

  return VerifyEmailValidator as unknown as typeof CoreVerifyEmailValidator
}

/**
 * returing VerifyingValidator class
 */
export const HOFVerifyingValidator: CoreAbstraction<typeof CoreVerifyingValidator> = (
  application
) => {
  const { rules, schema } = application.container.use('Adonis/Core/Validator')

  class VerifyingValidator {
    constructor(protected ctx: HttpContextContract) {}

    /*
     * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
     *
     * For example:
     * 1. The username must be of data type string. But then also, it should
     *    not contain special characters or numbers.
     *    ```
     *     schema.string({}, [ rules.alpha() ])
     *    ```
     *
     * 2. The email must be of data type string, formatted as a valid
     *    email. But also, not used by any other user.
     *    ```
     *     schema.string({}, [
     *       rules.email(),
     *       rules.unique({ table: 'users', column: 'email' }),
     *     ])
     *    ```
     */
    public schema = schema.create({
      email: schema.string({ escape: true, trim: true }, [rules.email()]),
      signature: schema.string({ escape: true, trim: true }),
    })

    /**
     * Custom messages for validation failures. You can make use of dot notation `(.)`
     * for targeting nested fields and array expressions `(*)` for targeting all
     * children of an array. For example:
     *
     * {
     *   'profile.username.required': 'Username is required',
     *   'scores.*.number': 'Define scores as valid numbers'
     * }
     *
     */
    public messages: CustomMessages = {}
  }

  return VerifyingValidator as unknown as typeof CoreVerifyingValidator
}
