import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'publications'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary().notNullable()
      table.string('title').notNullable()
      table.string('slug').nullable()
      table.enum('domain_type', ['panache', 'custom']).notNullable()
      table.string('custom_domain').nullable()
      table.boolean('custom_domain_verified').defaultTo(false)
      table.string('user_id').references('id').inTable('users').notNullable()
      table.boolean('is_custom_domain_paid').defaultTo(false)
      table.string('resend_audience_id').nullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
