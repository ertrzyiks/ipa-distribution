import express from 'express';

var app = express();

var v1 = express();

v1.get('/', (req, res) => {
   res.send("SIEMA!");
});

v1.get('/bundles/:id', (req, res) => {

});

v1.post('/bundles', (req, res) => {

});


app.use('/v1', v1);

export default app;
