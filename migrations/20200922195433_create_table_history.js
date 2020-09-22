
exports.up = function (knex, Promise) {
    return knex.schema.createTable('history', table => {
        table.increments('id').primary()
        table.integer('userId').references('id')
            .inTable('users').notNull()
        table.integer('deviceId').references('id')
            .inTable('devices').notNull()
        table.timestamp('modifiedAt').notNull()
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('history')
};
