import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'contacts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('publication_id').references('id').inTable('publications').onDelete('CASCADE')
      table.string('email').notNullable()
      table.boolean('unsubscribed').defaultTo(false)
      table.string('resend_id').nullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()

      // Compound unique index for email within a publication
      table.unique(['publication_id', 'email'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
