import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'

export default class RegisterValidator {
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
    name: schema.string({ escape: true, trim: true }, [
      rules.alpha({
        allow: Application.config.get('rapid.settings.nameAllow', ['dash', 'space', 'underscore']),
      }),
    ]),
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
