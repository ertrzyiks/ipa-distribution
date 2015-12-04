import defaults from 'defaults';
import uuid from 'node-uuid';
import getBookshelf from '../../src/getBookshelf';
import checkit from 'checkit';

let bookshelf = getBookshelf();

class Bundle extends bookshelf.Model {

    get tableName() { return 'bundles'; }
    get hasTimestamps() { return true; }

    constructor(...args) {
        super(...args);

        this.on('creating', this.generateId);
        this.on('saving', this.validateBundle);
    }

    generateId(model, attrs, options) {
        model.set('id', uuid.v4());
    }

    validateBundle(model, attrs, options) {
        let rules = {};

        return checkit(rules).run(attrs);
    }
}

function get(id) {
    let bundle = Bundle.forge({ id });

    return bundle
        .fetch({
            require: true
        })
        .then(b => b.toJSON());
}

function create(data) {
    data = data || {};
    delete data.id;

    let bundle = Bundle.forge(data);

    return bundle
        .save()
        .then(b => b.toJSON());
}

function update(id, data) {
    let bundle = Bundle.forge({ id });

    delete data.id;
    delete data.created_at;
    delete data.updated_at;

    return bundle
        .save(data)
        .then(b => b.toJSON());
}

function list(params) {
    var options = defaults(params, {
        page: 1,
        pageSize: 10
    });

    return Bundle.forge()
        .query(qb => {
            if (!options.showunpublished || options.showunpublished === 'false') {
                qb.where({ published: true });
            }

            qb.orderBy('created_at', 'DESC');
            qb.offset(options.pageSize * (options.page - 1));
            qb.limit(options.pageSize);
        })
        .fetchAll()
        .then(list => list.toJSON());
}

export default {
    get,
    create,
    update,
    list
};
