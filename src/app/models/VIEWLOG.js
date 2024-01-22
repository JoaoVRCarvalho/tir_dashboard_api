import Sequelize, { Model } from 'sequelize';

class VIEWLOG extends Model {
  static init(sequelize) {
    super.init(
      {
        COUNTRY: Sequelize.STRING(3).toSql(),
        IDENTI: Sequelize.STRING(25).toSql(),
        RELEASE: Sequelize.STRING(10).toSql(),
        IDEXEC: Sequelize.STRING(11).toSql(),
      },
      {
        sequelize,
      }
    );
  }
}

export default VIEWLOG;
