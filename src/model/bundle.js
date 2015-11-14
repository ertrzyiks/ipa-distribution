import getDataConnector from '../../src/getDataConnector';

let knex = getDataConnector();

function get(id) {
    return knex.table('bundles').first('*').where('id', id);
}

function save(data) {

}

function list(params) {

}

export default {
    get,
    save,
    list
};
