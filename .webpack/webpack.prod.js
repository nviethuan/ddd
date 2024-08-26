const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

const swcDefaultConfig = require('@nestjs/cli/lib/compiler/defaults/swc-defaults').swcDefaultsFactory({
  sourceMap: false,
  
}).swcOptions;

console.log('--------------------------');
console.log(process.env.NODE_ENV);
console.log('--------------------------');

module.exports = function (options, _webpack) {
  const config = {
    ...options,
    entry: [options.entry],
    externals: [nodeExternals()],
    mode: process.env.NODE_ENV || 'development',
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: {
            loader: 'swc-loader',
            options: swcDefaultConfig,
          },
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      }),
    ],
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true, // Loại bỏ console logs
              dead_code: true, // Loại bỏ mã không được sử dụng
              conditionals: true,
              unused: true,
              drop_debugger: true,
              evaluate: true,
              if_return: true,
              join_vars: true,
              pure_getters: true,
              sequences: true,
              side_effects: true,
            },
            mangle: true,
          },
        }),
      ],
    },
  };

  return config;
};
