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
var PostController = require("../controllers/postsController");
var ClientController = require("../controllers/client");

app.get('/posts', PostController.getAll);
app.post('/post_add', PostController.addPost);
app.put('/posts/:id', PostController.updatePost);
app.delete('/posts/:id', PostController.delete);
app.get('/post/:id', PostController.getPost);

app.get('/clients', ClientController.getAll);
app.post('/client_add', ClientController.add);
app.put('/client/:id', ClientController.update);
app.delete('/client/:id', ClientController.delete);
app.get('/client/:id', ClientController.get);

app.listen(process.env.PORT || 8081)
