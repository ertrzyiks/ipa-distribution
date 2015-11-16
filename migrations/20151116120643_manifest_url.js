
exports.up = function(knex, Promise) {
    return knex.schema.table('bundles', function(table) {
        table.string('manifest_url').defaultTo(null);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('bundles').dropColumn('manifest_url');
};
