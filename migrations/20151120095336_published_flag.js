
exports.up = function(knex, Promise) {
    return knex.schema.table('bundles', function(table) {
        table.boolean('published').defaultTo(false);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('bundles').dropColumn('published');
};
