/*eslint-env node */
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var loaders = [
  {
    test: /\.js$/,
    loader: 'babel',
    exclude: /node_modules/,
  },
  {
    test: /\.css$/,
    exclude: /\.global\.css$/,
    loader: ExtractTextPlugin.extract(
      'style?sourceMap',
      'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
    ),
  },
  {
    test: /\.global\.css$/,
    loader: ExtractTextPlugin.extract(
      'css'
    ),
  },
];

module.exports = [{
  entry: './src/RichTextEditor.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'react-rte.js',
    libraryTarget: 'commonjs2',
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
  },
  module: {loaders: loaders},
  plugins: [
    new ExtractTextPlugin("styles.css"),
    new webpack.optimize.UglifyJsPlugin({
      beautify: true,
      comments: true,
      mangle: false,
      compress: {
        dead_code: true,
      },
    })
  ],
}, {
  entry: './src/demo.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'demo.js',
  },
  module: {loaders: loaders},
  plugins: [
    new ExtractTextPlugin("styles.css"),
  ],
}];
