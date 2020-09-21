
exports.up = function (knex, Promise) {
    return knex.schema.alterTable('categories', table => {
        table.integer('userId').references('id')
            .inTable('users').notNull()
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.alterTable('categories', table => {
        table.integer('userId').references('id')
            .inTable('users').notNull()
    })
};
