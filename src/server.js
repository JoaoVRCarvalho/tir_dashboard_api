import app from './app';

require('dotenv').config();

// eslint-disable-next-line no-console
console.log(`Servidor iniciado com sucesso na porta ${process.env.APP_PORT}`);
app.listen(process.env.APP_PORT);
