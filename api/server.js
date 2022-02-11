const express = require('express');
const server = express();
const logger = require('morgan');
server.use(express.json());

server.use(logger('dev'));
const projectsRouter = require('./projects/projects-router')
const actionsRouter = require('./actions/actions-router')

server.use('/api/projects', projectsRouter)
server.use('/api/actions', actionsRouter)

server.use((error, req, res, next) => {
    console.log(error.status)
    res.status(error.status || 500).json({
      message: 'Something bad happened',
      originalMessage: error.message,
    })
  })

module.exports = server;