import { QueryTypes } from 'sequelize';
import VIEWLOG from '../models/VIEWLOG';

class ViewLogController {
  async getCountry(request, response) {
    let countries;
    let statusResponse = 200;
    const result = [];
    try {
      countries = await VIEWLOG.sequelize.query(
        'SELECT DISTINCT COUNTRY FROM VIEW_LOG ORDER BY COUNTRY',
        { type: QueryTypes.SELECT }
      );
      countries.forEach(country => {
        const obj = {
          value: country.COUNTRY.trim(),
          label: country.COUNTRY.trim(),
        };
        result.push(obj);
      });
    } catch (err) {
      statusResponse = 400;
      console.log(countries);
      console.log(err);
      logger.log('error', new Error('Falha ao ler registros'));
      logger.log('error', new Error(err.message));
    }
    return response.status(statusResponse).json(result);
  }

  async getIdentifier(request, response) {
    let identifiers;
    let statusResponse = 200;
    const { COUNTRY } = request.query;
    const result = [];
    try {
      identifiers = await VIEWLOG.sequelize.query(
        `SELECT DISTINCT IDENTI FROM VIEW_LOG WHERE COUNTRY='${COUNTRY}' ORDER BY IDENTI DESC`,
        { type: QueryTypes.SELECT }
      );
      identifiers.forEach(identifier => {
        const obj = {
          value: identifier.IDENTI.trim(),
          label: identifier.IDENTI.trim(),
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

  async getRelease(request, response) {
    let releases;
    let statusResponse = 200;
    const { COUNTRY, IDENTI } = request.query;
    const result = [];
    try {
      releases = await VIEWLOG.sequelize.query(
        `SELECT DISTINCT RELEASE FROM VIEW_LOG WHERE COUNTRY='${COUNTRY}' AND IDENTI='${IDENTI}' ORDER BY RELEASE DESC`,
        { type: QueryTypes.SELECT }
      );
      releases.forEach(release => {
        const obj = {
          value: release.RELEASE.trim(),
          label: release.RELEASE.trim(),
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

  async getIdExecution(request, response) {
    let idExecutions;
    let statusResponse = 200;
    const { COUNTRY, IDENTI, RELEASE } = request.query;
    const result = [];
    try {
      idExecutions = await VIEWLOG.sequelize.query(
        `SELECT DISTINCT IDEXEC FROM VIEW_LOG WHERE COUNTRY='${COUNTRY}' AND IDENTI='${IDENTI}' AND RELEASE='${RELEASE}' ORDER BY IDEXEC DESC`,
        { type: QueryTypes.SELECT }
      );
      idExecutions.forEach(idExecution => {
        const obj = {
          value: idExecution.IDEXEC.trim(),
          label: idExecution.IDEXEC.trim(),
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

export default new ViewLogController();
