import express from 'express';
import Bundle from '../model/bundle';

var app = express();

var v1 = express();

v1.get('/bundles/:id', (req, res) => {
   let id = req.params.id;

   Bundle.get(id).then((b) => {
      if (typeof b === 'undefined') {
         return res.status(404).send();
      }

      b.manifest_url = `${process.env.BASE_URL}/v1/bundles/${id}/manifest.plist`;
      b.download_url = `itms-services://?action=download-manifest&url=${b.manifest_url}`;

      res.json(b);
   });
});

v1.post('/bundles', (req, res) => {
   res.send("SIEMA!");
});


app.use('/v1', v1);

export default app;
