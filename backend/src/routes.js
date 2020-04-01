const express = require('express');
const crypto = require('crypto');
const connection = require('./database/connection');
const routes = express.Router();
const ongController = require('./controllers/ongController');
const incidentController = require('./controllers/incidentController');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');

routes.get('/ongs', ongController.listOngs);
routes.post('/ongs', ongController.createOng);

routes.get('/profile', profileController.index);

routes.get('/incidents', incidentController.listAllIncidents);
routes.post('/incidents', incidentController.creatIncident);
routes.delete('/incidents/:id', incidentController.deleteIncidente);

routes.post('/sessions', sessionController.create);

module.exports = routes;