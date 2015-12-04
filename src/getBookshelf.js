import getDataConnector from './getDataConnector';

let bookshelf;

export default function () {
    if (!bookshelf) {
        bookshelf = require('bookshelf')(getDataConnector());
    }

    return bookshelf;
}
