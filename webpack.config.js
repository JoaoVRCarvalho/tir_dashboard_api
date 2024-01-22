const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  target: 'node',
  entry: [path.resolve(__dirname, 'src', 'server.js')],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: path.resolve(__dirname, 'configApp.json'),
      },
    ],
  },

  externals: [
    nodeExternals(),
    'pg',
    { sqlite3: 'commonjs sqlite3' },
    'tedious',
    'pg-hstore',
    'sequelize',
  ],
  plugins: [
    new webpack.ContextReplacementPlugin(
      /Sequelize(\\|\/)/,
      path.resolve(__dirname, '../src')
    ),
  ],
};
