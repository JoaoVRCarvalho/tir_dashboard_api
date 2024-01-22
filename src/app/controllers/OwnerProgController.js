/* eslint-disable no-console */
import OWNERPROG from '../models/OWNERPROG';
const { QueryTypes } = require('sequelize');

class OwnerProgController {
  async getSegment(__, response) {
    let segments;
    let statusResponse = 200;
    const result = [];
    try {
      segments = await OWNERPROG.sequelize.query(
        'SELECT DISTINCT SEGMENTO FROM OWNERPROG',
        { type: QueryTypes.SELECT }
      );
      segments.forEach(segment => {
        const obj = {
          value: segment.SEGMENTO.trim(),
          label: segment.SEGMENTO.trim(),
        };
        result.push(obj);
      });
    } catch (err) {
      statusResponse = 400;
      logger.log('error', new Error('Falha ao ler registros'));
      logger.log('error', new Error(err.message));
    }
    return response.status(statusResponse).json(result);
  }

  async getSquad(request, response) {
    let squads;
    let statusResponse = 200;
    let { SEGMENT } = request.query;
    const result = [];
    try {
      SEGMENT = typeof SEGMENT === 'string' ? SEGMENT : SEGMENT.join("', '");
      squads = await OWNERPROG.sequelize.query(
        `SELECT DISTINCT SQUAD FROM OWNERPROG
          WHERE SEGMENTO IN ('${SEGMENT}')`,
        { type: QueryTypes.SELECT }
      );
      squads.forEach(squad => {
        const obj = {
          value: squad.SQUAD.trim(),
          label: squad.SQUAD.trim(),
        };
        result.push(obj);
      });
    } catch (err) {
      statusResponse = 400;
      logger.log('error', new Error('Falha ao ler registros'));
      logger.log('error', new Error(err.message));
    }
    return response.status(statusResponse).json(result);
  }

  async getModule(request, response) {
    let modules;
    let statusResponse = 200;
    let { SEGMENT, SQUAD } = request.query;
    const result = [];
    try {
      SEGMENT = typeof SEGMENT === 'string' ? SEGMENT : SEGMENT.join("', '");
      SQUAD = typeof SQUAD === 'string' ? SQUAD : SQUAD.join("', '");
      modules = await OWNERPROG.sequelize.query(
        `SELECT DISTINCT MODULO FROM OWNERPROG WHERE SEGMENTO IN ('${SEGMENT}') AND SQUAD IN ('${SQUAD}')`,
        { type: QueryTypes.SELECT }
      );
      modules.forEach(module => {
        const obj = {
          value: module.MODULO.trim(),
          label: module.MODULO.trim(),
        };
        result.push(obj);
      });
    } catch (err) {
      statusResponse = 400;
      logger.log('error', new Error('Falha ao ler registros'));
      logger.log('error', new Error(err.message));
    }
    return response.status(statusResponse).json(result);
  }
}

export default new OwnerProgController();
