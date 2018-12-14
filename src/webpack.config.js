const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
                modules: true,
                localIdentName: '[local]___[hash:base64:5]'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: path.join(process.cwd(), 'src/postcss.config.js')
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
