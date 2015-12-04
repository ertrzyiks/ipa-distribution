import express from 'express';
import bodyParser from 'body-parser';
import consolidate from 'consolidate';
import Bundle from '../model/bundle';
import _ from 'lodash';

var app = express();

var v1 = express();
v1.use(bodyParser.json());
v1.engine('nunjucks', consolidate.nunjucks);
v1.set('view engine', 'nunjucks');
v1.set('views', __dirname + '/views');

function prepareBundleObject(bundle) {
    bundle.manifest_url = bundle.manifest_url || `${process.env.BASE_URL}/v1/bundles/${bundle.id}/manifest.plist`;
    bundle.download_url = `itms-services://?action=download-manifest&url=${bundle.manifest_url}`;
    return bundle;
}

v1.get('/bundles/:id', (req, res) => {
    let id = req.params.id;

    Bundle.get(id)
        .then(b => prepareBundleObject(b))
        .then(b => res.json(b))
        .catch((err) => {
            return res.status(404).send();
        });
});

v1.get('/bundles/:id/manifest.plist', (req, res) => {
    let id = req.params.id;

    Bundle.get(id)
        .then(b => prepareBundleObject(b))
        .then(b => {
            res.header('Content-Type', 'application/xml');
            res.render('manifest', {
                bundle: b
            });
        })
        .catch((err) => {
            return res.status(404).send();
        });
});

v1.get('/bundles', (req, res) => {
    Bundle
        .list(req.query)
        .then(bundles => bundles.map(prepareBundleObject))
        .then(bundles => res.json(bundles));
});

v1.post('/bundles', (req, res) => {
    Bundle.create(req.body)
        .then(b => Bundle.get(b.id))
        .then(b => prepareBundleObject(b))
        .then(b => res.json(b))
        .catch(err => {
            res.status(400).send();
        });
});

v1.put('/bundles/:id', (req, res) => {
    let id = req.params.id;

    if (!id || _.isEmpty(req.body)) {
        res.status(400).send();
    }

    Bundle
        .update(id, req.body)
        .then(b => res.send())
        .catch(err => {
            res.status(500).send(err);
        });
});

app.use('/v1', v1);

export default app;
