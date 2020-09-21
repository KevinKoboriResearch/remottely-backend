
exports.up = function (knex, Promise) {
    return knex.schema.alterTable('users', table => {
        table.binary('image')
        // table.bytea('image')
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.alterTable('users', table => {
        table.dropColumn('image')
    })
};