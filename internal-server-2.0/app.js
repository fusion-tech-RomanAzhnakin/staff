const express = require('express');
const bodyParser = require('body-parser');

const cors = require('./middlewares/cors');
const statsCollector = require('./middlewares/statsCollector');
const parseQuery = require('./middlewares/parseQuery');

const setRoutes = require('./routes');
const errorHandler = require('./utils/errorHandler');

// used for compiling partials
require('./templates/compilePartials')();

const app = express();

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors);
app.use(statsCollector);
app.use(parseQuery);

setRoutes(app);

// eslint-disable-next-line no-unused-vars
app.use(errorHandler);

module.exports = app;
