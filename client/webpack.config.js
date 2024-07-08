const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './client.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env', '@babel/react'],
        },
      },
      {
        test: /\.s?css/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg)$/, 
        use: ['file-loader'],
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Zealthy Take Home',
      template: './client.html',
      favicon: 'favicon.ico', 
    }),
    new Dotenv()
  ],
  devServer: {
    host: 'localhost',
    port: 8080,
    static: {
      directory: path.resolve(__dirname, 'build'),
      publicPath: '/',
    },
    proxy: [{
      context: ['/**'],
      target: 'http://localhost:3000',
      secure: false,
      changeOrigin: true,
    }],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};