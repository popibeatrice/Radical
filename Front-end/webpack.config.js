const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
module.exports = {
  entry: {
    index: './src/js/index.js',
    indexEn: './src/js/indexEn.js',
    trasee_pe_jos: './src/js/trasee_pe_jos.js',
    routes_onfeet: './src/js/routes_onfeet.js',
    trasee_masina: './src/js/trasee_masina.js',
    routes_car: './src/js/routes_car.js',
    trasee_bicicleta: './src/js/trasee_bicicleta.js',
    routes_bicycle: './src/js/routes_bicycle.js',
    obiective: './src/js/obiective.js',
    login: './src/js/login.js',
    indexAdmin: './src/js/indexAdmin.js',
    create: './src/js/create.js',
    edit: './src/js/edit.js',
    obiectiveEN: './src/js/obiectiveEN.js',
  },
  mode: 'development',
  devServer: {
    watchFiles: ['src/**/*'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },

      {
        test: /\.html$/i,
        loader: 'html-loader',
      },

      {
        test: /\.(jpg|png|jpeg|svg|gif|pdf)$/,
        type: 'asset/resource',
      },

      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'src'),
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
    ],
  },
  optimization: {
    minimizer: [`...`, new CssMinimizerPlugin()],
  },
  resolve: {
    extensions: ['*', '.js'],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      // Also generate a test.html
      filename: 'index.html',
      template: 'src/html/index.html',
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      // Also generate a test.html
      filename: 'indexEn.html',
      template: 'src/html/indexEn.html',
      chunks: ['indexEn'],
    }),
    new HtmlWebpackPlugin({
      // Also generate a test.html
      filename: 'trasee_pe_jos.html',
      template: 'src/html/trasee_pe_jos.html',
      chunks: ['trasee_pe_jos'],
    }),
    new HtmlWebpackPlugin({
      // Also generate a test.html
      filename: 'routes_onfeet.html',
      template: 'src/html/routes_onfeet.html',
      chunks: ['routes_onfeet'],
    }),
    new HtmlWebpackPlugin({
      // Also generate a test.html
      filename: 'obiective.html',
      template: 'src/html/obiective.html',
      chunks: ['obiective'],
    }),
    new HtmlWebpackPlugin({
      // Also generate a test.html
      filename: 'obiectiveEN.html',
      template: 'src/html/obiectiveEN.html',
      chunks: ['obiectiveEN'],
    }),
    new HtmlWebpackPlugin({
      // Also generate a test.html
      filename: 'login.html',
      template: 'src/html/login.html',
      chunks: ['login'],
    }),
    new HtmlWebpackPlugin({
      // Also generate a test.html
      filename: 'indexAdmin.html',
      template: 'src/html/indexAdmin.html',
      chunks: ['indexAdmin'],
    }),
    new HtmlWebpackPlugin({
      // Also generate a test.html
      filename: 'create.html',
      template: 'src/html/create.html',
      chunks: ['create'],
    }),
    new HtmlWebpackPlugin({
      // Also generate a test.html
      filename: 'trasee_masina.html',
      template: 'src/html/trasee_masina.html',
      chunks: ['trasee_masina'],
    }),
    new HtmlWebpackPlugin({
      // Also generate a test.html
      filename: 'routes_car.html',
      template: 'src/html/routes_car.html',
      chunks: ['routes_car'],
    }),
    new HtmlWebpackPlugin({
      // Also generate a test.html
      filename: 'edit.html',
      template: 'src/html/edit.html',
      chunks: ['edit'],
    }),
    new HtmlWebpackPlugin({
      // Also generate a test.html
      filename: 'trasee_bicicleta.html',
      template: 'src/html/trasee_bicicleta.html',
      chunks: ['trasee_bicicleta'],
    }),
    new HtmlWebpackPlugin({
      // Also generate a test.html
      filename: 'routes_bicycle.html',
      template: 'src/html/routes_bicycle.html',
      chunks: ['routes_bicycle'],
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public'),
    clean: true,
    publicPath: '/',
  },
};
