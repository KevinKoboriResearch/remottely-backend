
exports.up = function (knex, Promise) {
    return knex.schema.createTable('userToDevice', table => {
        table.increments('id').primary()
        table.integer('userId').references('id')
            .inTable('users').notNull()
        table.integer('deviceId').references('id')
            .inTable('devices').notNull()
        table.string('userDeviceRole').notNull().defaultTo('authorized')
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('userToDevice')
};
