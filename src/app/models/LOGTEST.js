import Sequelize, { Model } from 'sequelize';

class LOGTEST extends Model {
  static init(sequelize) {
    super
      .init(
        {
          IDENTI: Sequelize.STRING(25).toSql(),
          IDEXEC: Sequelize.STRING(11).toSql(),
          TOOL: Sequelize.STRING(15).toSql(),
          LASTEXEC: Sequelize.STRING(50).toSql(),
          TESTSUITE: Sequelize.STRING(50).toSql(),
          TESTCASE: Sequelize.STRING(50).toSql(),
          CTMETHOD: Sequelize.STRING(50).toSql(),
          CTNUMBER: Sequelize.STRING(6).toSql(),
          TESTTYPE: Sequelize.STRING(50).toSql(),
          EXECDATE: Sequelize.STRING(8).toSql(),
          EXECTIME: Sequelize.STRING(8).toSql(),
          PASS: Sequelize.INTEGER,
          FAIL: Sequelize.INTEGER,
          SECONDSCT: Sequelize.INTEGER,
          FAILMSG: Sequelize.TEXT,
          COUNTRY: Sequelize.STRING(3).toSql(),
          VERSION: Sequelize.STRING(6).toSql(),
          RELEASE: Sequelize.STRING(10).toSql(),
          PROGRAM: Sequelize.STRING(50).toSql(),
          PROGDATE: Sequelize.STRING(8).toSql(),
          PROGTIME: Sequelize.STRING(8).toSql(),
          USRNAME: Sequelize.STRING(25).toSql(),
          STATION: Sequelize.STRING(50).toSql(),
          LIBVERSION: Sequelize.STRING(50).toSql(),
          APPVERSION: Sequelize.STRING(50).toSql(),
          CLIVERSION: Sequelize.STRING(50).toSql(),
          DBACCESS: Sequelize.STRING(50).toSql(),
          DBTYPE: Sequelize.STRING(50).toSql(),
          DBVERSION: Sequelize.STRING(50).toSql(),
          SOTYPE: Sequelize.STRING(50).toSql(),
          SOVERSION: Sequelize.STRING(50).toSql(),
          TOKEN: Sequelize.STRING(50).toSql(),
          STATUS: Sequelize.STRING(1).toSql(),
          OBSERV: Sequelize.STRING(255).toSql(),
          D_E_L_E_T_: Sequelize.STRING(1),
        },
        {
          sequelize,
        }
      )
      .removeAttribute('id');
  }

  static groupBy(array, prop) {
    const value = array.reduce((total, item) => {
      const key = item[prop];
      total[key] = (total[key] || []).concat(item);

      return total;
    }, {});

    return value;
  }
}

export default LOGTEST;
