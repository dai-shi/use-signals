import path from 'node:path';
import url from 'node:url';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const { DIR, EXT = 'ts' } = process.env;

export default {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: `./examples/${DIR}/src/index.${EXT}`,
  output: {
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `./examples/${DIR}/public/index.html`,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      'use-signals': `${path.dirname(url.fileURLToPath(import.meta.url))}/src`,
    },
  },
  devServer: {
    port: process.env.PORT || '8080',
    static: {
      directory: `./examples/${DIR}/public`,
    },
    historyApiFallback: true,
  },
};
