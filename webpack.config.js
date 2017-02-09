const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: ['babel-polyfill', path.join(__dirname, "src", "app.js")],
  output: {
    path: path.join(__dirname, 'src', 'public', 'javascripts'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        cacheDirectory: 'babel_cache',
        presets: ['react', 'latest']
      }
    },
    {
      test:/\.json$/,
      loader: 'json'
    }]
  },
  externals: {
    fs: '{}',
    tls: '{}',
    net: '{}',
    console: '{}'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: true },
      mangle: false,
      sourcemap: true,
      beautify: false
    })
  ]
};
