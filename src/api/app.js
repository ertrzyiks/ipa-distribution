import express from 'express';
import consolidate from 'consolidate'
import Bundle from '../model/bundle';

var app = express();

var v1 = express();
v1.engine('nunjucks', consolidate.nunjucks);
v1.set('view engine', 'nunjucks');
v1.set('views', __dirname + '/views');

function prepareBundleObject(bundle) {
   bundle.manifest_url = `${process.env.BASE_URL}/v1/bundles/${bundle.id}/manifest.plist`;
   bundle.download_url = `itms-services://?action=download-manifest&url=${bundle.manifest_url}`;
   return bundle;
}

v1.get('/bundles/:id', (req, res) => {
   let id = req.params.id;

   Bundle.get(id).then((b) => {
      if (typeof b === 'undefined') {
         return res.status(404).send();
      }

      b = prepareBundleObject(b);

      res.json(b);
   });
});

v1.get('/bundles/:id/manifest.plist', (req, res) => {
   let id = req.params.id;

   Bundle.get(id).then((b) => {
      if (typeof b === 'undefined') {
         return res.status(404).send();
      }

      b = prepareBundleObject(b);

      res.header("Content-Type", "application/xml");
      res.render('manifest', {
         bundle: b
      });
   });
});

v1.get('/bundles', (req, res) => {
   Bundle
       .list(req.query)
       .then((bundles) => bundles.map(prepareBundleObject))
       .then((bundles) => {
         res.json(bundles);
      });
});

v1.post('/bundles', (req, res) => {
   res.send("SIEMA!");
});


app.use('/v1', v1);

export default app;
