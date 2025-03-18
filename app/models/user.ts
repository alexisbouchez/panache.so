import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { afterCreate, column, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import Publication from './publication.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import env from '#start/env'
import Stripe from 'stripe'
import BaseModel from './base_model.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column()
  declare imageUrl: string | null

  @hasMany(() => Publication)
  declare publications: HasMany<typeof Publication>

  @column()
  declare stripeCustomerId: string | null

  @afterCreate()
  static async createStripeCustomer(user: User) {
    const stripe = new Stripe(env.get('STRIPE_SECRET_KEY'))
    const customer = await stripe.customers.create({
      email: user.email,
    })

    user.stripeCustomerId = customer.id
    await user.save()
  }
}
