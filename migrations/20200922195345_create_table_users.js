
exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary()
        table.string('fullname').notNull()
        table.string('phone').notNull().unique()
        table.binary('image')
        table.string('password').notNull()
        table.integer('role').notNull().defaultTo(0)
        table.timestamp('deletedAt')
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users')
};