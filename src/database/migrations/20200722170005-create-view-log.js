const view_name = 'VIEW_LOG';
const query = ` SELECT DISTINCT COUNTRY, IDENTI, RELEASE, IDEXEC
                FROM LOGTEST
                WHERE (IDENTI <> '') AND (IDEXEC <> '')`;
module.exports = {
  up(queryInterface) {
    return queryInterface.sequelize.query(
      `CREATE VIEW ${view_name} AS ${query}`
    );
  },
  down(queryInterface) {
    return queryInterface.sequelize.query(`DROP VIEW ${view_name}`);
  },
};
