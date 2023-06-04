const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
module.exports = {
<<<<<<< HEAD
    entry: {
        index: "./src/js/index.js",
        indexEn: "./src/js/indexEn.js",
        trasee_pe_jos: "./src/js/trasee.js",
    },
    mode: "development",
    devServer: {
        watchFiles: ["src/**/*"],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
=======
  entry: {
    index: './src/js/index.js',
    indexEn: './src/js/indexEn.js',
    obiective: './src/js/obiective.js',
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
>>>>>>> 77f893353065d2a8015f5b2d140875c6307d05c5

            {
                test: /\.html$/i,
                loader: "html-loader",
            },

            {
                test: /\.(jpg|png|jpeg|svg|gif|pdf)$/,
                type: "asset/resource",
            },

            {
                test: /\.css$/i,
                include: path.resolve(__dirname, "src"),
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                ],
            },
        ],
    },
    optimization: {
        minimizer: [`...`, new CssMinimizerPlugin()],
    },
    resolve: {
        extensions: ["*", ".js"],
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            // Also generate a test.html
            filename: "index.html",
            template: "src/html/index.html",
            chunks: ["index"],
        }),
        new HtmlWebpackPlugin({
            // Also generate a test.html
            filename: "indexEn.html",
            template: "src/html/indexEn.html",
            chunks: ["indexEn"],
        }),
        new HtmlWebpackPlugin({
            // Also generate a test.html
            filename: "trasee.html",
            template: "src/html/trasee.html",
            chunks: ["trasee"],
        }),
    ],
<<<<<<< HEAD
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "public"),
        clean: true,
    },
=======
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
      filename: 'obiective.html',
      template: 'src/html/obiective.html',
      chunks: ['obiective'],
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public'),
    clean: true,
  },
>>>>>>> 77f893353065d2a8015f5b2d140875c6307d05c5
};
