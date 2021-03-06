const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');

const picture = require('./picture.js');

mongoose
    .connect('mongodb://candrade86:password@ds263989.mlab.com:63989/notes')
    .then(() => console.log(`\n ${picture}\n Connected to MongoDB`))
    .catch(err => console.log('Unable to connect to DB'));

const notesController = require('./notes/notesController');
const userController = require('./users/userController');
const server = express();

server.use(helmet());
server.use(morgan('dev'));
server.use(express.json());


server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
});

server.use('/api/notes', notesController);
server.use('/api/user', userController);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n ${picture}\n API running on port: ${port}`))



