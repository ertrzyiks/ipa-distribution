import defaults from 'defaults';
import uuid from 'node-uuid';
import getDataConnector from '../../src/getDataConnector';

let knex = getDataConnector();

function get(id) {
    return knex
        .first('*')
        .from('bundles')
        .where('id', id);
}

function create(data) {
    data = data || {};
    data.id = uuid.v4();
    data.created_at = new Date();
    data.updated_at = data.created_at;

    return knex('bundles')
        .insert(data)
        .then((res) => {
            return get(data.id);
        });
}

function list(params) {
    var options = defaults(params, {
        page: 1,
        pageSize: 10
    });

    return knex
        .select('*')
        .from('bundles')
        .orderBy('created_at', 'DESC')
        .offset(options.pageSize * (options.page - 1))
        .limit(options.pageSize);
}

export default {
    get,
    create,
    list
};
