import { QueryTypes } from 'sequelize';
import LOGTEST from '../models/LOGTEST';
import Json from '../../shared/Json';

import { readFilter } from '../../shared/readFilter';

class LogController {
  // -- Efetua registro de log na tabela LOGEXEC
  async store(request, response) {
    let statusResponse = 200;
    const objDefault = Object.assign(request.body, {
      D_E_L_E_T_: '',
      R_E_C_D_E_L_: 0,
    });
    try {
      await LOGTEST.create(objDefault);
    } catch (err) {
      Json.create(objDefault); // -- Cria um json no caso de erro
      statusResponse = 202;
      global.logger.error('Error in function store LogController');
      global.logger.error(err.message);
    }
    return response
      .status(statusResponse)
      .json({ sucesso: 'Registro incluido com sucesso.' });
  }

  // -- Efetua listagem de logs da tabela LOGEXEC
  async index(request, response) {
    let result = '';
    let statusResponse = 200;
    let select = '';
    let group = '';
    const params = request.query;
    const where = readFilter(params);
    const { TYPE, isTotvs } = params;

    try {
      if (!isTotvs) {
        select = ` RTRIM(LTRIM(LOGTEST.COUNTRY)) COUNTRY,
                  RTRIM(LTRIM(LOGTEST.IDEXEC)) IDEXEC,
                  RTRIM(LTRIM(LOGTEST.IDENTI)) IDENTI,
                  RTRIM(LTRIM(LOGTEST.RELEASE)) RELEASE,
                  RTRIM(LTRIM(LOGTEST.TESTSUITE)) TESTSUITE,
                  SUM(LOGTEST.PASS)+SUM(LOGTEST.FAIL) TOTAL,
                  SUM(LOGTEST.PASS) PASS,
                  SUM(LOGTEST.FAIL) FAIL,
                  SUM(LOGTEST.SECONDSCT) SECONDS `;

        const queryTotal = ` SELECT
                'TOTAL GERAL' DESCTOTAL,
                RTRIM(LTRIM(LOGTEST.COUNTRY)) COUNTRY,
                RTRIM(LTRIM(LOGTEST.IDEXEC)) IDEXEC,
                RTRIM(LTRIM(LOGTEST.IDENTI)) IDENTI,
                RTRIM(LTRIM(LOGTEST.RELEASE)) RELEASE,
                SUM(LOGTEST.PASS)+SUM(LOGTEST.FAIL) TOTAL,
                SUM(LOGTEST.PASS) PASS,
                SUM(LOGTEST.FAIL) FAIL,
                SUM(LOGTEST.SECONDSCT) SECONDS
              FROM LOGTEST
              WHERE ${where}
              GROUP BY LOGTEST.COUNTRY,LOGTEST.IDEXEC,LOGTEST.IDENTI, LOGTEST.RELEASE
          `;

        // -- Agrupando
        const retornoTotal = LOGTEST.groupBy(
          await LOGTEST.sequelize.query(queryTotal, {
            type: QueryTypes.SELECT,
          }),
          'DESCTOTAL'
        );

        const query = ` SELECT
              ${select}
              FROM LOGTEST
              WHERE ${where}
              GROUP BY LOGTEST.COUNTRY,LOGTEST.IDEXEC,LOGTEST.IDENTI, LOGTEST.RELEASE, LOGTEST.TESTSUITE
          `;

        // -- Agrupando
        const groupData = LOGTEST.groupBy(
          await LOGTEST.sequelize.query(query, {
            type: QueryTypes.SELECT,
          }),
          'TESTSUITE'
        );
        result = Object.assign(retornoTotal, groupData);
        return response.status(statusResponse).json(result);
      }
      let varGroupBy;
      switch (TYPE) {
        case 'segmento':
          varGroupBy = 'SEGMENTO';
          select = `RTRIM(LTRIM(LOGTEST.COUNTRY)) COUNTRY,
                  RTRIM(LTRIM(LOGTEST.IDEXEC)) IDEXEC,
                  RTRIM(LTRIM(LOGTEST.IDENTI)) IDENTI,
                  RTRIM(LTRIM(LOGTEST.RELEASE)) RELEASE,
                  RTRIM(LTRIM(OWNERPROG.SEGMENTO)) SEGMENTO,
                  SUM(LOGTEST.PASS)+SUM(LOGTEST.FAIL) TOTAL,
                  SUM(LOGTEST.PASS) PASS,
                  SUM(LOGTEST.FAIL) FAIL,
                  SUM(LOGTEST.SECONDSCT) SECONDS`;
          group =
            'LOGTEST.COUNTRY,LOGTEST.IDEXEC,LOGTEST.IDENTI, LOGTEST.RELEASE,OWNERPROG.SEGMENTO';
          break;

        case 'squad':
          varGroupBy = 'SQUAD';
          select = `RTRIM(LTRIM(LOGTEST.COUNTRY)) COUNTRY,
                  RTRIM(LTRIM(LOGTEST.IDEXEC)) IDEXEC,
                  RTRIM(LTRIM(LOGTEST.IDENTI)) IDENTI,
                  RTRIM(LTRIM(LOGTEST.RELEASE)) RELEASE,
                  RTRIM(LTRIM(OWNERPROG.SQUAD)) SQUAD,
                  SUM(LOGTEST.PASS)+SUM(LOGTEST.FAIL) TOTAL,
                  SUM(LOGTEST.PASS) PASS,
                  SUM(LOGTEST.FAIL) FAIL,
                  SUM(LOGTEST.SECONDSCT) SECONDS`;
          group =
            'LOGTEST.COUNTRY,LOGTEST.IDEXEC,LOGTEST.IDENTI, LOGTEST.RELEASE,OWNERPROG.SQUAD';
          break;

        case 'modulo':
          varGroupBy = 'MODULO';
          select = `RTRIM(LTRIM(LOGTEST.COUNTRY)) COUNTRY,
                  RTRIM(LTRIM(LOGTEST.IDEXEC)) IDEXEC,
                  RTRIM(LTRIM(LOGTEST.IDENTI)) IDENTI,
                  RTRIM(LTRIM(LOGTEST.RELEASE)) RELEASE,
                  RTRIM(LTRIM(OWNERPROG.MODULO)) MODULO,
                  SUM(LOGTEST.PASS)+SUM(LOGTEST.FAIL) TOTAL,
                  SUM(LOGTEST.PASS) PASS,
                  SUM(LOGTEST.FAIL) FAIL,
                  SUM(LOGTEST.SECONDSCT) SECONDS`;
          group =
            'LOGTEST.COUNTRY,LOGTEST.IDEXEC,LOGTEST.IDENTI, LOGTEST.RELEASE,OWNERPROG.MODULO';
          break;

        case 'criticidade':
          varGroupBy = 'CRITIC';
          select = `RTRIM(LTRIM(LOGTEST.COUNTRY)) COUNTRY,
                  RTRIM(LTRIM(LOGTEST.IDEXEC)) IDEXEC,
                  RTRIM(LTRIM(LOGTEST.IDENTI)) IDENTI,
                  RTRIM(LTRIM(LOGTEST.RELEASE)) RELEASE,
                  RTRIM(LTRIM(OWNERPROG.CRITIC)) CRITIC,
                  SUM(LOGTEST.PASS)+SUM(LOGTEST.FAIL) TOTAL,
                  SUM(LOGTEST.PASS) PASS,
                  SUM(LOGTEST.FAIL) FAIL,
                  SUM(LOGTEST.SECONDSCT) SECONDS`;
          group =
            'LOGTEST.COUNTRY,LOGTEST.IDEXEC,LOGTEST.IDENTI, LOGTEST.RELEASE,OWNERPROG.CRITIC';
          break;
        default:
          break;
      }
      const queryTotal = ` SELECT
                'TOTAL GERAL' DESCTOTAL,
                RTRIM(LTRIM(LOGTEST.COUNTRY)) COUNTRY,
                RTRIM(LTRIM(LOGTEST.IDEXEC)) IDEXEC,
                RTRIM(LTRIM(LOGTEST.IDENTI)) IDENTI,
                RTRIM(LTRIM(LOGTEST.RELEASE)) RELEASE,
                SUM(LOGTEST.PASS)+SUM(LOGTEST.FAIL) TOTAL,
                SUM(LOGTEST.PASS) PASS,
                SUM(LOGTEST.FAIL) FAIL,
                SUM(LOGTEST.SECONDSCT) SECONDS
              FROM LOGTEST
              INNER JOIN OWNERPROG ON LOGTEST.TESTSUITE = LTRIM(RTRIM(OWNERPROG.PROGRAMA))+'TESTSUITE'
              WHERE ${where}
              GROUP BY LOGTEST.COUNTRY,LOGTEST.IDEXEC,LOGTEST.IDENTI, LOGTEST.RELEASE
          `;

      // -- Agrupando
      const retornoTotal = LOGTEST.groupBy(
        await LOGTEST.sequelize.query(queryTotal, {
          type: QueryTypes.SELECT,
        }),
        'DESCTOTAL'
      );

      const query = ` SELECT
              ${select}
              FROM LOGTEST
              INNER JOIN OWNERPROG ON LOGTEST.TESTSUITE = LTRIM(RTRIM(OWNERPROG.PROGRAMA))+'TESTSUITE'
              WHERE ${where}
              GROUP BY ${group}
          `;

      // -- Agrupando
      const groupData = LOGTEST.groupBy(
        await LOGTEST.sequelize.query(query, {
          type: QueryTypes.SELECT,
        }),
        varGroupBy
      );

      result = Object.assign(retornoTotal, groupData);
    } catch (err) {
      statusResponse = 400;
      global.logger.error('Error in function index LogController');
      global.logger.error(err.message);
    }
    return response.status(statusResponse).json(result);
  }

  // -- Mostra o resumo das Suites quando seleciona um grafico
  async showResume(request, response) {
    const params = request.query;
    const { isTotvs } = params;
    let statusResponse = 200;
    let inner = '';
    let result = '';
    let where = readFilter(params);

    try {
      if (isTotvs) {
        inner =
          "INNER JOIN OWNERPROG ON LOGTEST.TESTSUITE = LTRIM(RTRIM(OWNERPROG.PROGRAMA))+'TESTSUITE'";
      }
      where += ` AND FAIL=1 `;

      const query = ` SELECT DISTINCT RTRIM(LTRIM(LOGTEST.TESTSUITE)) TESTSUITE
                FROM LOGTEST
                ${inner}
              WHERE ${where}
              ORDER BY TESTSUITE
            `;

      result = await LOGTEST.sequelize.query(query, {
        type: QueryTypes.SELECT,
      });
    } catch (err) {
      statusResponse = 400;
      global.logger.error('Error in function showResume LogController');
      global.logger.error(err.message);
    }
    return response.status(statusResponse).json(result);
  }

  // -- Mostra detalhes dos itens de um TestSuite
  async showDetail(request, response) {
    const params = request.query;
    let inner = '';
    const { TESTSUITE, isTotvs } = params;
    let where = await readFilter(params);
    let result = '';
    let statusResponse = 200;

    try {
      if (isTotvs) {
        inner =
          "INNER JOIN OWNERPROG ON LOGTEST.TESTSUITE = LTRIM(RTRIM(OWNERPROG.PROGRAMA))+'TESTSUITE'";
      }
      where += ` AND FAIL=1 `;
      if (TESTSUITE) where += `AND TESTSUITE IN ('${TESTSUITE}')`;
      const query = ` SELECT
                  LOGTEST.R_E_C_N_O_ UNIQUEID,
                  RTRIM(LTRIM(LOGTEST.TESTCASE)) TESTCASE,
                  RTRIM(LTRIM(LOGTEST.CTMETHOD)) CTMETHOD,
                  RTRIM(LTRIM(LOGTEST.CTNUMBER)) CTNUMBER,
                  RTRIM(LTRIM(LOGTEST.TESTTYPE)) TESTTYPE,
                  RTRIM(LTRIM(LOGTEST.STATUS)) STATUS,
                  RTRIM(LTRIM(LOGTEST.OBSERV)) OBSERV,
                  RTRIM(LTRIM(LOGTEST.FAILMSG)) FAILMSG
                FROM LOGTEST
                  ${inner}
                  WHERE ${where}
                  ORDER BY TESTCASE,CTMETHOD,CTNUMBER
              `;

      result = await LOGTEST.sequelize.query(query, {
        type: QueryTypes.SELECT,
      });
    } catch (err) {
      statusResponse = 400;
      global.logger.error('Error in function showItens LogController');
      global.logger.error(err.message);
    }
    return response.status(statusResponse).json(result);
  }

  // -- Analisa observação
  async analize(request, response) {
    const params = request.body;
    const { UNIQUEID, OBSERV } = params;
    let statusResponse = 200;

    try {
      const query = `UPDATE LOGTEST SET
                      OBSERV='${OBSERV}',STATUS='1' WHERE R_E_C_N_O_=${UNIQUEID}`;

      await LOGTEST.sequelize.query(query, {
        type: QueryTypes.SELECT,
      });
    } catch (err) {
      statusResponse = 400;
      global.logger.error('Error in function analize LogController');
      global.logger.error(err.message);
    }
    return response
      .status(statusResponse)
      .json({ sucesso: 'Registro incluido com sucesso.' });
  }

  // --Realiza consulta para query de CSV tela de comparação
  async showDetailComplete(request, response) {
    const params = request.query;
    const { TESTSUITE, isTotvs } = params;
    let select = '';
    let inner = '';
    let where = await readFilter(params);
    let result = '';
    let statusResponse = 200;

    try {
      where += ` AND FAIL=1 `;

      if (isTotvs) {
        inner =
          "INNER JOIN OWNERPROG ON LOGTEST.TESTSUITE = LTRIM(RTRIM(OWNERPROG.PROGRAMA))+'TESTSUITE'";
        select = `
          RTRIM(LTRIM(OWNERPROG.SEGMENTO)) SEGMENTO,
          RTRIM(LTRIM(OWNERPROG.SQUAD)) SQUAD,
          RTRIM(LTRIM(OWNERPROG.MODULO)) MODULO,
        `;
      }

      if (TESTSUITE) where += `AND TESTSUITE IN ('${TESTSUITE}')`;

      const query = ` SELECT
                  ${select}
                  RTRIM(LTRIM(LOGTEST.COUNTRY)) COUNTRY,
                  RTRIM(LTRIM(LOGTEST.IDENTI)) IDENTI,
                  RTRIM(LTRIM(LOGTEST.RELEASE)) RELEASE,
                  RTRIM(LTRIM(LOGTEST.IDEXEC)) IDEXEC,
                  RTRIM(LTRIM(LOGTEST.TESTSUITE)) TESTSUITE,
                  RTRIM(LTRIM(LOGTEST.TESTCASE)) TESTCASE,
                  RTRIM(LTRIM(LOGTEST.CTMETHOD)) CTMETHOD,
                  RTRIM(LTRIM(LOGTEST.CTNUMBER)) CTNUMBER,
                  RTRIM(LTRIM(LOGTEST.TESTTYPE)) TESTTYPE,
                  RTRIM(LTRIM(LOGTEST.STATUS)) STATUS,
                  RTRIM(LTRIM(LOGTEST.OBSERV)) OBSERV,
                  RTRIM(LTRIM(LOGTEST.FAILMSG)) FAILMSG
                FROM LOGTEST
                ${inner}
                  WHERE ${where}
                  ORDER BY TESTSUITE,TESTCASE,CTMETHOD,CTNUMBER
              `;
      result = await LOGTEST.sequelize.query(query, {
        type: QueryTypes.SELECT,
      });
    } catch (err) {
      statusResponse = 400;
      global.logger.error('Error in function showDetailComplete LogController');
      global.logger.error(err.message);
    }
    return response.status(statusResponse).json(result);
  }

  // -- Mostra detalhes filtrando o que passou e falhou por ID
  async showFromIdExecution(request, response) {
    const params = request.query;
    const { COUNTRY, IDENTI, RELEASE, IDEXEC } = params;
    let result = '';
    let statusResponse = 200;

    try {
      const query = `SELECT RTRIM(LTRIM(LOGTEST.IDEXEC)) IDEXEC,
                      SUM(LOGTEST.PASS)+SUM(LOGTEST.FAIL) TOTAL,
                      SUM(LOGTEST.PASS) PASS,
                      SUM(LOGTEST.FAIL) FAIL
                  FROM LOGTEST
              WHERE
              COUNTRY = ('${COUNTRY}') AND
              IDENTI = ('${IDENTI}') AND
              RELEASE = ('${RELEASE}') AND
              IDEXEC = ('${IDEXEC}') AND
              LOGTEST.LASTEXEC = (SELECT MAX(LASTEXEC)LASTEXEC
              FROM LOGTEST LOGEX
              WHERE  COUNTRY = ('${COUNTRY}') AND
              IDENTI = ('${IDENTI}') AND
              RELEASE = ('${RELEASE}') AND
              IDEXEC = ('${IDEXEC}')
              AND LOGTEST.TESTCASE = LOGEX.TESTCASE AND
              LOGTEST.CTMETHOD = LOGEX.CTMETHOD AND
              LOGTEST.CTNUMBER = LOGEX.CTNUMBER  )
              GROUP BY LOGTEST.IDEXEC
            `;
      result = await LOGTEST.sequelize.query(query, {
        type: QueryTypes.SELECT,
      });
    } catch (err) {
      statusResponse = 400;
      global.logger.error(
        'Error in function showFromIdExecution LogController'
      );
      global.logger.error(err.message);
    }
    return response.status(statusResponse).json(result);
  }

  // -- Mostra detalhes status por o que foi analisado
  async showFromIdAnalyze(request, response) {
    const params = request.query;
    const { COUNTRY, IDENTI, RELEASE, IDEXEC } = params;
    let result = '';
    let statusResponse = 200;

    try {
      const query = ` SELECT RTRIM(LTRIM(LOGTEST.IDEXEC)) IDEXECTOTAL,
            CASE WHEN STATUS = '1'
            THEN 'ANALISADO'
            ELSE 'SEM ANALISE'
            END AS STATUS,
            SUM(LOGTEST.FAIL) FAILTOTAL
            FROM LOGTEST
              WHERE
              FAIL = 1 AND
              COUNTRY = ('${COUNTRY}') AND
              IDENTI = ('${IDENTI}') AND
              RELEASE = ('${RELEASE}') AND
              IDEXEC = ('${IDEXEC}') AND
              LOGTEST.LASTEXEC = (SELECT MAX(LASTEXEC)LASTEXEC
              FROM LOGTEST LOGEX
              WHERE  COUNTRY = ('${COUNTRY}') AND
              IDENTI = ('${IDENTI}') AND
              RELEASE = ('${RELEASE}') AND
              IDEXEC = ('${IDEXEC}')
              AND LOGTEST.TESTCASE = LOGEX.TESTCASE AND
              LOGTEST.CTMETHOD = LOGEX.CTMETHOD AND
              LOGTEST.CTNUMBER = LOGEX.CTNUMBER  )
              GROUP BY STATUS,IDEXEC
              ORDER BY STATUS
            `;
      result = await LOGTEST.sequelize.query(query, {
        type: QueryTypes.SELECT,
      });
      if (result.length > 0) {
        const { IDEXECTOTAL, FAILTOTAL, STATUS } = result[0];

        const totalRows = result.reduce(
          (accumulator, current) => accumulator + current.FAILTOTAL,
          0
        );
        if (FAILTOTAL === totalRows) {
          if (STATUS === 'ANALISADO') {
            result.push({ IDEXECTOTAL, STATUS: 'SEM ANALISE', FAILTOTAL: 0 });
          } else {
            result.push({ IDEXECTOTAL, STATUS: 'ANALISADO', FAILTOTAL: 0 });
          }
        }
      } else {
        result.push({
          IDEXECTOTAL: IDEXEC,
          STATUS: 'SEM ANALISE',
          FAILTOTAL: 0,
        });
        result.push({
          IDEXECTOTAL: IDEXEC,
          STATUS: 'ANALISADO',
          FAILTOTAL: 0,
        });
      }
    } catch (err) {
      statusResponse = 400;
      global.logger.error('Error in function showFromIdAnalyze LogController');
      global.logger.error(err.message);
    }
    return response.status(statusResponse).json(result);
  }

  // -- Exibe registro com todas as suites de testes que deram erro
  async showFromIdTestSuite(request, response) {
    const params = request.query;
    const { COUNTRY, IDENTI, RELEASE, IDEXEC, TESTSUITE } = params;
    let result = '';
    let statusResponse = 200;

    try {
      let where = ` 1 = 1 `;

      if (!TESTSUITE) {
        where += `AND TESTSUITE IN (SELECT DISTINCT TESTSUITE FROM LOGTEST WHERE
          COUNTRY = ('${COUNTRY}') AND
          IDENTI = ('${IDENTI}') AND
          RELEASE = ('${RELEASE}') AND
          IDEXEC = ('${IDEXEC}') AND FAIL = 1 )
        `;
      } else {
        const suites =
          typeof TESTSUITE === 'string' && TESTSUITE.length > 1
            ? TESTSUITE
            : TESTSUITE.join("', '");
        where += `AND TESTSUITE IN ('${suites}')`;
      }
      const query = `SELECT
                  RTRIM(LTRIM(LOGTEST.IDEXEC)) IDEXEC,
                  RTRIM(LTRIM(LOGTEST.TESTSUITE)) TESTSUITE,
                  SUM(LOGTEST.PASS)+SUM(LOGTEST.FAIL) TOTAL,
                  SUM(LOGTEST.PASS) PASS,
                  SUM(LOGTEST.FAIL) FAIL
                FROM LOGTEST
                  WHERE
                    COUNTRY = ('${COUNTRY}') AND
                    IDENTI = ('${IDENTI}') AND
                    RELEASE = ('${RELEASE}') AND
                    IDEXEC = ('${IDEXEC}') AND
                    LOGTEST.LASTEXEC = (SELECT MAX(LASTEXEC)LASTEXEC
                    FROM LOGTEST LOGEX
                    WHERE  COUNTRY = ('${COUNTRY}') AND
                    IDENTI = ('${IDENTI}') AND
                    RELEASE = ('${RELEASE}') AND
                    IDEXEC = ('${IDEXEC}')
                    AND LOGTEST.TESTCASE = LOGEX.TESTCASE AND
                    LOGTEST.CTMETHOD = LOGEX.CTMETHOD AND
                    LOGTEST.CTNUMBER = LOGEX.CTNUMBER  ) AND
                    ${where}
                    GROUP BY IDEXEC, TESTSUITE
                  ORDER BY IDEXEC, TESTSUITE
            `;

      const resultado = await LOGTEST.sequelize.query(query, {
        type: QueryTypes.SELECT,
      });
      // -- Considera os 70 primeiros com erro
      const testSuites = Object.assign([], resultado.slice(0, 70));

      const mappedTestSuiteName = testSuites.map(
        testSuite => testSuite.TESTSUITE
      );
      const mappedTestSuiteTotal = testSuites.map(testSuite => testSuite.TOTAL);
      const mappedTestSuiteFail = testSuites.map(testSuite => testSuite.FAIL);
      const mappedTestSuitePass = testSuites.map(testSuite => testSuite.PASS);

      result = {
        mappedTestSuiteName,
        mappedTestSuiteTotal,
        mappedTestSuiteFail,
        mappedTestSuitePass,
      };
    } catch (err) {
      statusResponse = 400;
      global.logger.error(
        'Error in function showFromIdTestSuite LogController'
      );
      global.logger.error(err.message);
    }
    return response.status(statusResponse).json(result);
  }

  // -- Exibe todos as suites de teste para o combo
  async showFromAllTestSuite(request, response) {
    const params = request.query;
    const { COUNTRY, IDENTI, RELEASE, IDEXEC } = params;
    const result = [];
    let testSuites;
    let statusResponse = 200;

    try {
      const query = `SELECT
                  RTRIM(LTRIM(LOGTEST.TESTSUITE)) TESTSUITE
                FROM LOGTEST
                  WHERE
                    COUNTRY = ('${COUNTRY}') AND
                    IDENTI = ('${IDENTI}') AND
                    RELEASE = ('${RELEASE}') AND
                    IDEXEC = ('${IDEXEC}')
                    GROUP BY TESTSUITE
                  ORDER BY TESTSUITE
            `;

      testSuites = await LOGTEST.sequelize.query(query, {
        type: QueryTypes.SELECT,
      });

      testSuites.forEach(testSuite => {
        const obj = {
          value: testSuite.TESTSUITE.trim(),
          label: testSuite.TESTSUITE.trim(),
        };
        result.push(obj);
      });
    } catch (err) {
      statusResponse = 400;
      global.logger.error(
        'Error in function showFromAllTestSuite OwnerProgController'
      );
      global.logger.error(err);
    }
    return response.status(statusResponse).json(result);
  }

  async showFromLogAll(request, response) {
    const params = request.query;
    const { COUNTRY, IDENTI, RELEASE, IDEXEC, TESTSUITE } = params;
    const where = TESTSUITE ? ` TESTSUITE IN ('${TESTSUITE}') ` : '';
    let result = '';
    let statusResponse = 200;

    try {
      const query = ` SELECT
                  LOGTEST.R_E_C_N_O_ UNIQUEID,
                  RTRIM(LTRIM(LOGTEST.COUNTRY)) COUNTRY,
                  RTRIM(LTRIM(LOGTEST.IDENTI)) IDENTI,
                  RTRIM(LTRIM(LOGTEST.RELEASE)) RELEASE,
                  RTRIM(LTRIM(LOGTEST.IDEXEC)) IDEXEC,
                  RTRIM(LTRIM(LOGTEST.TESTSUITE)) TESTSUITE,
                  RTRIM(LTRIM(LOGTEST.TESTCASE)) TESTCASE,
                  RTRIM(LTRIM(LOGTEST.CTMETHOD)) CTMETHOD,
                  RTRIM(LTRIM(LOGTEST.CTNUMBER)) CTNUMBER,
                  RTRIM(LTRIM(LOGTEST.TESTTYPE)) TESTTYPE,
                  RTRIM(LTRIM(LOGTEST.STATUS)) STATUS,
                  RTRIM(LTRIM(LOGTEST.OBSERV)) OBSERV,
                  RTRIM(LTRIM(LOGTEST.FAILMSG)) FAILMSG
                FROM LOGTEST
                  WHERE
                    COUNTRY = ('${COUNTRY}') AND
                    IDENTI = ('${IDENTI}') AND
                    RELEASE = ('${RELEASE}') AND
                    IDEXEC = ('${IDEXEC}') AND
                    FAIL=1 AND
                    LOGTEST.LASTEXEC = (SELECT MAX(LASTEXEC)LASTEXEC
                    FROM LOGTEST LOGEX
                    WHERE  COUNTRY = ('${COUNTRY}') AND
                    IDENTI = ('${IDENTI}') AND
                    RELEASE = ('${RELEASE}') AND
                    IDEXEC = ('${IDEXEC}')
                    AND LOGTEST.TESTCASE = LOGEX.TESTCASE AND
                    LOGTEST.CTMETHOD = LOGEX.CTMETHOD AND
                    LOGTEST.CTNUMBER = LOGEX.CTNUMBER  ) AND
                    ${where}
                  ORDER BY IDEXEC,TESTSUITE,TESTCASE,CTMETHOD,CTNUMBER
              `;
      result = await LOGTEST.sequelize.query(query, {
        type: QueryTypes.SELECT,
      });
    } catch (err) {
      statusResponse = 400;
      global.logger.error('Error in function showFromLogAll LogController');
      global.logger.error(err.message);
    }
    return response.status(statusResponse).json(result);
  }
}

export default new LogController();
