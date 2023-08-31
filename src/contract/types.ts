import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export type ActionStoreKey = 'login.show' | 'register.show'

export type HandlerActions<TData extends Record<never, never> = {}, TReturns = any> = (
  ctx: HttpContextContract,
  data: TData
) => TReturns
