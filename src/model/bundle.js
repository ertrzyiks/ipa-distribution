import defaults from 'defaults';
import uuid from 'node-uuid';
import getDataConnector from '../../src/getDataConnector';
import _ from 'lodash';

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

function update(id, data) {
    var updatedData = prepareBundleUpdateData(data);
    return knex('bundles')
            .where('id', id)
            .limit(1)
            .update(updatedData);
}

function list(params) {
    var options = defaults(params, {
        page: 1,
        pageSize: 10
    });

    var filteredQuery = getFilteredQuery(options);

    return filteredQuery
        .orderBy('created_at', 'DESC')
        .offset(options.pageSize * (options.page - 1))
        .limit(options.pageSize);
}

function getFilteredQuery(options) {
    var query = knex
                .select('*')
                .from('bundles');

    if (!options.showunpublished || options.showunpublished === 'false') {
        query = query
                .where({ published: true });
    }

    return query;
}

function prepareBundleUpdateData(data) {
    delete data.id;
    delete data.created_at;

    data.updated_at = new Date();

    return data;
}

export default {
    get,
    create,
    update,
    list
};
