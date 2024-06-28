const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const cors = require('cors');
app.use(cors());

//parse request body
app.use(express.json());

//routes
const api = require('./routes/api');

//begin routes
app.use('/v1/api', api);

//catch 404 and forward to error handler
app.use((req, res, next) => {
  return res.status(404).sendFile(path.resolve(__dirname, '../client/404.html'));
});

//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'express error handler caught unknown error',
    status: 500,
    message: { err: 'an error occurred' },
  };
  const errObj = { ...defaultErr, ...err };
  console.log(errObj.log);
  return res.status(errObj.status).json(errObj.message);
})

app.listen(PORT, () => console.log('server listening on port 3000'));

//for jest tests
module.exports = app;

