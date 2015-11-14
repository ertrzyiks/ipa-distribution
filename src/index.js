import app from './api/app';

export function start(port = 3000) {
    app.listen(port);

    console.log(`Listening on ${port}`);
}
