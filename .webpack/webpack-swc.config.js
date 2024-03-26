const nodeExternals = require('webpack-node-externals');

const swcDefaultConfig =
  require('@nestjs/cli/lib/compiler/defaults/swc-defaults').swcDefaultsFactory({
    sourceMap: false,
    moduleResolution: 'node',
  }).swcOptions;

module.exports = function (options, webpack) {
  const config = {
    ...options,
    entry: [
      'webpack/hot/poll?100',
      `${options.entry}`.replace('.ts', '.hot.ts'),
    ],
    devtool: 'eval-cheap-module-source-map',
    externals: [
      nodeExternals({
        allowlist: ['webpack/hot/poll?100'],
      }),
    ],
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
      ...options.plugins,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.WatchIgnorePlugin({
        paths: [/\.js$/, /\.d\.ts$/],
      }),
    ],
  };


  return config;
};
