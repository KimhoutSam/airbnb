import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export type ActionStoreKey =
  | 'login.index'
  | 'register.index'
  | 'verify-email.index'
  | 'forgot-password.index'
  | 'confirm-password.index'
  | 'two-factor-challenge.index'
  | 'reset-password.index'

export type HandlerActions<TData extends Record<never, never> = {}, TReturns = any> = (
  ctx: HttpContextContract,
  data: TData
) => TReturns
