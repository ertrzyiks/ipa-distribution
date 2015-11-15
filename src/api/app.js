import express from 'express';
import Bundle from '../model/bundle';

var app = express();

var v1 = express();

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

v1.get('/bundles', (req, res) => {
   Bundle.list(req.query).then((bundles) => {
      res.json(bundles);
   });
});

v1.post('/bundles', (req, res) => {
   res.send("SIEMA!");
});


app.use('/v1', v1);

export default app;
