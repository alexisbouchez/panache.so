import { DateTime } from 'luxon'
import { belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Publication from './publication.js'
import BaseModel from './base_model.js'

export default class Post extends BaseModel {
  @column()
  declare title: string

  @column()
  declare slug: string

  @column()
  declare content: string

  @column()
  declare published: boolean

  @column()
  declare isDraft: boolean

  @column.dateTime()
  declare publishedAt: DateTime | null

  @belongsTo(() => Publication)
  declare publication: BelongsTo<typeof Publication>

  @column()
  declare publicationId: string
}
