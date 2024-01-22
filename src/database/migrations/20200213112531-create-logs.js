module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('LOGTEST', {
      IDENTI: {
        type: Sequelize.STRING(25).toSql(),
      },
      IDEXEC: {
        type: Sequelize.STRING(11).toSql(),
      },
      TOOL: {
        type: Sequelize.STRING(15).toSql(),
      },
      LASTEXEC: {
        type: Sequelize.STRING(50).toSql(),
      },
      TESTSUITE: {
        type: Sequelize.STRING(50).toSql(),
      },
      TESTCASE: {
        type: Sequelize.STRING(50).toSql(),
      },
      CTMETHOD: {
        type: Sequelize.STRING(50).toSql(),
      },
      CTNUMBER: {
        type: Sequelize.STRING(6).toSql(),
      },
      TESTTYPE: {
        type: Sequelize.STRING(50).toSql(),
      },
      EXECDATE: {
        type: Sequelize.STRING(8).toSql(),
      },
      EXECTIME: {
        type: Sequelize.STRING(8).toSql(),
      },
      PASS: {
        type: Sequelize.INTEGER,
      },
      FAIL: {
        type: Sequelize.INTEGER,
      },
      SECONDSCT: {
        type: Sequelize.INTEGER,
      },
      FAILMSG: {
        type: Sequelize.TEXT,
      },
      COUNTRY: {
        type: Sequelize.STRING(3).toSql(),
      },
      VERSION: {
        type: Sequelize.STRING(6).toSql(),
      },
      RELEASE: {
        type: Sequelize.STRING(10).toSql(),
      },
      PROGRAM: {
        type: Sequelize.STRING(50).toSql(),
      },
      PROGDATE: {
        type: Sequelize.STRING(8).toSql(),
      },
      PROGTIME: {
        type: Sequelize.STRING(8).toSql(),
      },
      USRNAME: {
        type: Sequelize.STRING(25).toSql(),
      },
      STATION: {
        type: Sequelize.STRING(50).toSql(),
      },
      LIBVERSION: {
        type: Sequelize.STRING(50).toSql(),
      },
      APPVERSION: {
        type: Sequelize.STRING(50).toSql(),
      },
      CLIVERSION: {
        type: Sequelize.STRING(50).toSql(),
      },
      DBACCESS: {
        type: Sequelize.STRING(50).toSql(),
      },
      DBTYPE: {
        type: Sequelize.STRING(50).toSql(),
      },
      DBVERSION: {
        type: Sequelize.STRING(50).toSql(),
      },
      SOTYPE: {
        type: Sequelize.STRING(50).toSql(),
      },
      SOVERSION: {
        type: Sequelize.STRING(50).toSql(),
      },
      TOKEN: {
        type: Sequelize.STRING(50).toSql(),
      },
      STATUS: {
        type: Sequelize.STRING(1).toSql(),
        defaultValue: ' ',
      },
      OBSERV: {
        type: Sequelize.STRING(255).toSql(),
        defaultValue: ' ',
      },
      D_E_L_E_T_: {
        type: Sequelize.STRING(1),
        defaultValue: '',
      },
      R_E_C_N_O_: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      R_E_C_D_E_L_: {
        type: Sequelize.INTEGER,
        defaultValue: '',
      },
    });

    await queryInterface.addIndex(
      'LOGTEST',
      [
        'IDEXEC',
        'TESTTYPE',
        'TESTSUITE',
        'TESTCASE',
        'CTMETHOD',
        'CTNUMBER',
        'RELEASE',
        'COUNTRY',
        'IDENTI',
        'TOOL',
        'EXECDATE',
        'EXECTIME',
        'USRNAME',
        'LASTEXEC',
      ],
      { name: 'LOGTEST01' }
    );
    return queryInterface.addIndex(
      'LOGTEST',
      [
        'IDEXEC',
        'TESTTYPE',
        'TESTSUITE',
        'RELEASE',
        'COUNTRY',
        'IDENTI',
        'TOOL',
        'USRNAME',
      ],
      { name: 'LOGTEST02' }
    );
  },

  down: queryInterface => {
    return queryInterface.dropTable('LOGTEST');
  },
};
