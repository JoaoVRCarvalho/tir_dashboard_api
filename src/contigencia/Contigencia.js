/* eslint-disable no-console */
import jsonfile from 'jsonfile';
import fs from 'fs';

import LOGTEST from '../app/models/LOGTEST';
import logger from '../shared/logger';

require('dotenv').config();

const jsonsPath = process.env.PATH_SERVER;
const processedPath = process.env.PATH_PROCESSED;

class Contigencia {
  async jsonsImport() {
    this.getFilesFromPath().forEach(json => {
      try {
        console.log(`Efetuando importação do arquivo ${json}`);
        const file = jsonfile.readFileSync(jsonsPath + json);
        LOGTEST.create(file).then(() =>
          this.pushFileFromPath(jsonsPath + json, processedPath + json)
        );
      } catch (err) {
        logger.log('error', new Error('Falha ao importar registro'));
        logger.log('error', new Error(err.message));
      }
    });
  }

  getFilesFromPath() {
    const dir = fs.readdirSync(jsonsPath);
    return dir.filter(elm => elm.match(new RegExp(`.*.(${'json'})`, 'ig')));
  }

  pushFileFromPath(oldPath, newPath) {
    fs.rename(oldPath, newPath, err => {
      if (err) throw err;
    });
  }
}

export default new Contigencia();
