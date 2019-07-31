const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: path.join(process.cwd(), 'src/index.js'),
  output: {
    path: path.join(process.cwd(), 'www/assets'),
    filename: 'scripts/bundle.js'
  },
  mode: process.env.NODE_ENV || 'development',
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.json']
  },
  plugins: [new ExtractTextPlugin('styles/bundle.css', { allChunks: true })],
  optimization: {
    minimizer: [new UglifyJsPlugin({ extractComments: true })]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: {
                  mode: 'local',
                  localIdentName: '[name]__[local]--[hash:base64:5]',
                  context: path.resolve(__dirname, 'src')
                  // hashPrefix: 'my-custom-hash'
                }
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: path.join(process.cwd(), 'config/postcss.config.js'),
                  ctx: {
                    cssnano: {}
                  }
                }
              }
            }
          ]
        })
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        loaders: ['file-loader']
      }
    ]
  }
};
