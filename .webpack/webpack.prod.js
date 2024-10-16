const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require('terser-webpack-plugin');

const swcDefaultConfig = require('@nestjs/cli/lib/compiler/defaults/swc-defaults').swcDefaultsFactory({
  sourceMap: false,
  
}).swcOptions;

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
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
              dead_code: true,
              conditionals: true,
              unused: true,
              drop_debugger: true,
              evaluate: true,
              if_return: true,
              join_vars: true,
              pure_getters: true,
              sequences: true,
              side_effects: true,
              keep_fnames: true,
              keep_classnames: true,
            },
            mangle: true,
          },
        }),
      ],
    },
  };

  return config;
};
