
exports.up = function (knex, Promise) {
    return knex.schema.alterTable('users', table => {
        table.binary('image')
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.alterTable('users', table => {
        table.dropColumn('image')
    })
};