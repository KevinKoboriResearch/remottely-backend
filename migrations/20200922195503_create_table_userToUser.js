
exports.up = function (knex, Promise) {
    return knex.schema.createTable('userConnections', table => {
        table.increments('id').primary()
        table.integer('firstUserId').references('id')
            .inTable('users').notNull()
        table.integer('secondUserId').references('id')
            .inTable('users').notNull()
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('userToUser')
};
