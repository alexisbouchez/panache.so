import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'posts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('publication_id').references('id').inTable('publications').onDelete('CASCADE')
      table.string('title').notNullable()
      table.string('slug').nullable()
      table.text('content').notNullable()
      table.boolean('published').defaultTo(false)
      table.boolean('is_draft').defaultTo(true)
      table.timestamp('published_at', { useTz: true }).nullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()

      // Compound unique index for slug within a publication
      table.unique(['publication_id', 'slug'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
