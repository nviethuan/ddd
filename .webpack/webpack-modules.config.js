const nodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');

module.exports = function (options, webpack) {
  const config = {
    ...options,
    entry: ['webpack/hot/poll?100', `${options.entry}`.replace('.ts', '.ts')],
    devtool: 'source-map',
    externals: [
      nodeExternals({
        allowlist: ['webpack/hot/poll?100'],
      }),
    ],
    mode: process.env.NODE_ENV || 'development',
    module: {
      rules: [
        {
          test: /.tsx?$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: false
              }
            }
          ],
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      ...options.plugins,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.WatchIgnorePlugin({
        paths: [/\.js$/, /\.d\.ts$/],
      }),
      // new RunScriptWebpackPlugin({ name: options.output.filename, autoRestart: false }),
    ],
  };
  return config;
};
