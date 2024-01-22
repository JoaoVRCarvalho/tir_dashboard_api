import express from 'express';
import cron from 'node-cron';
import cors from 'cors';
import routes from './routes';
import Contigencia from './contigencia/Contigencia';
import logger from './shared/logger';
import './database';

require('dotenv').config();

class App {
  constructor() {
    this.server = express();
    global.logger = logger; // -- Log de registros como global
    cron.schedule(process.env.SCHEDULE, () => Contigencia.jsonsImport());
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
