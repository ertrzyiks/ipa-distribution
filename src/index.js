import app from './api/app';
import debugFactory from 'debug';

const debug = debugFactory('ipa-distribution:server');

export function start(port = 3000) {
    app.listen(port);

    debug(`Listening on ${port}`);
}
