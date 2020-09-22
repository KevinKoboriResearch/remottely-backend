
exports.up = function (knex, Promise) {
    return knex.schema.createTable('devices', table => {
        table.increments('id').primary()
        table.string('name', 20).notNull()
        table.string('nickname', 20).notNull()
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
