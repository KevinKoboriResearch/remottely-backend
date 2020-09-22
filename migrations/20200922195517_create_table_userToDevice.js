
exports.up = function (knex, Promise) {
    return knex.schema.createTable('userDevices', table => {
        table.increments('id').primary()
        table.integer('userId').references('id')
            .inTable('users').notNull()
        table.integer('deviceId').references('id')
            .inTable('devices').notNull()
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('userToDevice')
};
