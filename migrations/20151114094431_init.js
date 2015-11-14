
exports.up = function(knex, Promise) {
    return knex.schema.createTable('bundles', function (table) {
        table.uuid('id').notNullable().primary();
        table.string('app_id').notNullable();
        table.string('name').notNullable();
        table.string('version').notNullable();
        table.string('url').notNullable();
        table.datetime('created_at').defaultTo(null);
        table.datetime('updated_at').defaultTo(null);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('bundles');
};
