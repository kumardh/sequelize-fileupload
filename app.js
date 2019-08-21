const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
var path = require('path');
const db = require('./models/sequelize');
const bodypareser = require('body-parser');
const categoryApi = require('./controllers/category')

var app = express();
const port = process.env.PORT || 3000

global.appRoot = __dirname;

app.use(bodypareser.json());
 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

categoryApi(app,db);

app.listen(port, ()=> console.log(`Application started on Port ${port}.`));