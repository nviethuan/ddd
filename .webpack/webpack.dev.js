const nodeExternals = require('webpack-node-externals');

module.exports = function (options, webpack) {
  const config = {
    ...options,
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
          test: /\.ts$/,
          exclude: /node_modules/,
          use: {
            loader: 'ts-loader',
            options: {
              transpileOnly: false,
              compilerOptions: {
                module: 'NodeNext'
              }
            },
          },
        },
      ],
    },
    plugins: [
      ...options.plugins,
      new webpack.WatchIgnorePlugin({
        paths: [/\.js$/, /\.d\.ts$/],
      }),
    ],
  };

  return config;
};
