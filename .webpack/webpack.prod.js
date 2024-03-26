const nodeExternals = require('webpack-node-externals');

const swcDefaultConfig =
  require('@nestjs/cli/lib/compiler/defaults/swc-defaults').swcDefaultsFactory({
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
  };

  return config;
};
