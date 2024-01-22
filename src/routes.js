import Router from 'express';
import LogController from './app/controllers/LogController';
import OwnerProgController from './app/controllers/OwnerProgController';
import ViewLogController from './app/controllers/ViewLogController';

const routes = new Router();

routes.get('/', (_, response) => {
  response.status(200).json({
    sucesso:
      'Bem vindo ao serviço de logs, para inclusão de logs acesse a rota /log',
  });
});
// -- Logs
routes.post('/log', LogController.store);

// -- Rotas referente a página comparação
routes.get('/log', LogController.index);
routes.get('/log-detail', LogController.showResume);
routes.get('/log-detail-suite', LogController.showDetail);
routes.put('/analyze-save', LogController.analize);

// --CSV pagina compare
routes.get('/log-detail-complete', LogController.showDetailComplete);

// -- Page status
routes.get('/getFromIdExecution', LogController.showFromIdExecution);
routes.get('/getFromIdAnalyze', LogController.showFromIdAnalyze);
routes.get('/getFromAllTestSuite', LogController.showFromAllTestSuite);
routes.get('/getFromIdTestSuite', LogController.showFromIdTestSuite);

routes.get('/getFromLogAll', LogController.showFromLogAll);
// -- OwnerProgram
routes.get('/segment', OwnerProgController.getSegment);
routes.get('/squad', OwnerProgController.getSquad);
routes.get('/module', OwnerProgController.getModule);

// -- ViewLog
routes.get('/country', ViewLogController.getCountry);
routes.get('/identifier', ViewLogController.getIdentifier);
routes.get('/release', ViewLogController.getRelease);
routes.get('/idexecution', ViewLogController.getIdExecution);

export default routes;
