const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

const mongodb_conn_module = require('./mongodbConnModule');
var db = mongodb_conn_module.connect();
var ClientController = require("../controllers/client");
var TratamientoController = require("../controllers/tratamiento");

app.get('/clients', ClientController.getAll);
app.post('/client_add', ClientController.add);
app.put('/client/:id', ClientController.update);
app.delete('/client/:id', ClientController.delete);
app.get('/client/:id', ClientController.get);

app.get('/tratamientos', TratamientoController.getAll);
app.post('/tratamiento_add', TratamientoController.add);
app.put('/tratamiento/:id', TratamientoController.update);
app.delete('/tratamiento/:id', TratamientoController.delete);
app.get('/tratamiento/:id', TratamientoController.get);

app.listen(process.env.PORT || 8081)
