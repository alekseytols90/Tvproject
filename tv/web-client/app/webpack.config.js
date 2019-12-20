const path = require('path')
const BUILD_DIR = path.resolve(__dirname, './static')
const SOURCE_DIR = path.resolve(__dirname, './source')
const webpack = require('webpack')


module.exports = () => {
  return {
    mode: 'production',
    watch: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    entry: [SOURCE_DIR + '/index.jsx'],
    output: {
      path: BUILD_DIR,
      filename: 'bundle.js'
    },
    externals: [{
        'react': 'React',
        'react-dom': 'ReactDOM'
      }
      // /@material-ui\/core\/*./
    ],
    plugins: [
      new webpack.EnvironmentPlugin([
        'HOST_URL',
        'API_URL',
      ]),
    ],
    devtool: 'source-map',
    module: {
      rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ["@babel/preset-env", { modules: false }],
              "@babel/preset-react"
            ],
            plugins: [
              ["@babel/plugin-proposal-class-properties", { "loose": true }],
              ["@babel/plugin-transform-runtime"]
            ]
          }
        }
      }]
    }
  }
}
