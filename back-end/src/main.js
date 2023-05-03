import express from 'express';
import bodyParser from 'body-parser';
import App from './app.js';
import cors from 'cors';

const app = express();
app.use(cors());
const mainApp = new App();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// Start app
mainApp.start(app);
