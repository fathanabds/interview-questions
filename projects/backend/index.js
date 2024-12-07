require('dotenv').config();
const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const app = express();
const port = 3000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(require('./routers'));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`);
});
