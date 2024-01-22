const readFilter = params => {
  let where = ' 1 = 1 ';

  let { SEGMENT, SQUAD, MODULE } = params;
  const { GRID } = params;
  const objGrid = JSON.parse(decodeURIComponent(GRID));

  if (SEGMENT) {
    SEGMENT =
      typeof SEGMENT === 'string' && SEGMENT.length > 1
        ? SEGMENT
        : SEGMENT.join("', '");
    where += `AND SEGMENTO IN ('${SEGMENT}')`;
  }

  if (SQUAD) {
    SQUAD =
      typeof SQUAD === 'string' && SQUAD.length > 1
        ? SQUAD
        : SQUAD.join("', '");
    where += `AND SQUAD IN ('${SQUAD}')`;
  }

  if (MODULE) {
    MODULE =
      typeof MODULE === 'string' && MODULE.length > 1
        ? MODULE
        : MODULE.join("', '");
    where += `AND MODULO IN ('${MODULE}')`;
  }
  let isFirst = true;
  objGrid.forEach(item => {
    if (isFirst) {
      where += ` AND (`;
      isFirst = false;
    } else {
      where += ` OR `;
    }
    where += `(COUNTRY = ('${item.country}')`;
    where += `AND IDENTI = ('${item.identifier}')`;
    where += `AND RELEASE = ('${item.release}')`;

    // --Realiza filtro para considerar a ultima execução
    if (item.lastExecution) {
      where += `AND LOGTEST.LASTEXEC = `;
      where += `(SELECT MAX(LASTEXEC)LASTEXEC `;
      where += `FROM LOGTEST LOGEX `;
      where += `WHERE COUNTRY = ('${item.country}') `;
      where += `AND IDENTI = ('${item.identifier}') `;
      where += `AND RELEASE = ('${item.release}') `;
      where += `AND IDEXEC = ('${item.idExecution}') `;
      where += `AND LOGTEST.TESTCASE = LOGEX.TESTCASE )`;
    }
    where += `AND IDEXEC = ('${item.idExecution}'))`;
  });
  where += `)`;
  return where;
};

// eslint-disable-next-line import/prefer-default-export
export { readFilter };
