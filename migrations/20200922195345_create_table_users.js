
exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('phone').notNull().unique()
        table.binary('image')
        table.string('password').notNull()
        table.string('role').notNull().defaultTo('authorized')
        table.timestamp('deletedAt')
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users')
};