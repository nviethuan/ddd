// Webpack HRM with SWC
// Manual build (research)
const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require('terser-webpack-plugin');

const swcDefaultConfig =
  require('@nestjs/cli/lib/compiler/defaults/swc-defaults').swcDefaultsFactory({
    sourceMap: true,
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
