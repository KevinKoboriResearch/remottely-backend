
exports.up = function (knex, Promise) {
    return knex.schema.createTable('devices', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('description', 1000).notNull()
        table.binary('image')
        table.integer('userId').references('id')
            .inTable('users').notNull()
        table.integer('categoryId').references('id')
            .inTable('categories').notNull()
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('devices')
};
