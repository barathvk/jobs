var webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  stats: {
    assets: false
  },
  entry: {
    'app.js': [path.resolve(__dirname,'./ui/src/js/core.jsx')]
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js','.js'],
    alias: {
      'ie': 'component-ie'
    }
  },
  output: {
    path: path.resolve(__dirname,'./ui/build'),
    filename: '[name]',
    publicPath: '/'
  },
  module:{
    loaders:[
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: [
          'react-hot',
          'babel?presets[]=react,presets[]=es2015'
        ]
      },
      { test: /\.(sass|scss)$/, loaders: ['style','css','sass'] },
      { test: /\.css$/, loaders: ['style','css'] },
      { test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/, loader: 'url-loader?limit=100000&name=fonts/[name].[ext]' },
      { test: /\.jade$/, loader: 'jade'}
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    }),
    new HtmlWebpackPlugin({
      title: 'Jobs',
      filename: 'index.html'
    }),
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        React: 'react',
        FA: 'react-fontawesome',
        cn: 'classnames',
        _: 'underscore',
        page: 'page',
        dotaccess: 'dotaccess',
        ReactDOM: 'react-dom',
        axios: 'axios'
    })
  ],
  sassLoader: {
    indentedSyntax: true
  }
}
