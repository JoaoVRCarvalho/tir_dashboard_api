module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('OWNERPROG', {
      PROGRAMA: {
        type: Sequelize.STRING(50).toSql(),
      },
      STATUS: {
        type: Sequelize.STRING(10).toSql(),
      },
      SEGMENTO: {
        type: Sequelize.STRING(50).toSql(),
      },
      MODULO: {
        type: Sequelize.STRING(50).toSql(),
      },
      CRITIC: {
        type: Sequelize.STRING(50).toSql(),
      },
      LASTUSR: {
        type: Sequelize.STRING(50).toSql(),
      },
      LASTDTUPD: {
        type: Sequelize.STRING(8).toSql(),
      },
      LASTHRUPD: {
        type: Sequelize.STRING(8).toSql(),
      },
      OBSERVACAO: {
        type: Sequelize.STRING(255).toSql(),
      },
      D_E_L_E_T_: {
        type: Sequelize.STRING(1),
      },
      R_E_C_N_O_: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      R_E_C_D_E_L_: {
        type: Sequelize.INTEGER,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('OWNERPROG');
  },
};
