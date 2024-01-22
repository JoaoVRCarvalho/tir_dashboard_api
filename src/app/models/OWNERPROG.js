import Sequelize, { Model } from 'sequelize';

class OWNERPROG extends Model {
  static init(sequelize) {
    super.init(
      {
        SEGMENTO: Sequelize.STRING(50).toSql(),
        SQUAD: Sequelize.STRING(50).toSql(),
        MODULO: Sequelize.STRING(50).toSql(),
      },
      {
        sequelize,
      }
    );
  }
}

export default OWNERPROG;
