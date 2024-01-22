import Sequelize from 'sequelize';

import LOGTEST from '../app/models/LOGTEST';
import OWNERPROG from '../app/models/OWNERPROG';
import VIEWLOG from '../app/models/VIEWLOG';

import databaseConfig from '../config/database';

const models = [LOGTEST, OWNERPROG, VIEWLOG];
class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
