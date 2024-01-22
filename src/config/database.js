require('dotenv').config();

module.exports = {
  dialect: process.env.DB_TYPE,
  storage: process.env.DB_STORAGE,
  dialectOptions: {
    bigNumberStrings: false,
    supportBigNumbers: false,
    options: {
      instanceName: process.env.DB_INSTANCENAME,
      enableArithAbort: true,
      connectTimeout: 300000,
      requestTimeout: 300000,
    },
  },

  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  define: {
    timestamps: false,
    underscored: false,
    underscoredAll: false,
    freezeTableName: true,
  },
};
