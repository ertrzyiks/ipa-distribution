import getDataConnector from '../../src/getDataConnector';
import uuid from 'node-uuid';

let knex = getDataConnector();

function get(id) {
    return knex.table('bundles').first('*').where('id', id);
}

function create(data) {
    data = data || {};
    data.id = uuid.v4();

    return knex.table('bundles').insert(data).then((res) => {
        return data;
    });
}

function list(params) {

}

export default {
    get,
    create,
    list
};
