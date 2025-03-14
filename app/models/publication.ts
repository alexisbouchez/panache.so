import { belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import AppBaseModel from './base_model.js'
import Post from './post.js'
import Contact from './contact.js'

export default class Publication extends AppBaseModel {
  @column()
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column()
  declare title: string

  @column()
  declare slug: string

  @column()
  declare domainType: 'panache' | 'custom'

  @column()
  declare customDomain: string | null

  @column()
  declare customDomainVerified: boolean

  @column()
  declare isCustomDomainPaid: boolean

  @column()
  declare resendAudienceId: string | null

  @hasMany(() => Post)
  declare posts: HasMany<typeof Post>

  @hasMany(() => Contact)
  declare contacts: HasMany<typeof Contact>
}
