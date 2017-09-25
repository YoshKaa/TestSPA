const path = require('path');

module.exports = {
  entry: './client/app.js',
  output: {
    filename: 'bundle.js',
    //path: path.resolve(__dirname, 'production/build')
	path: __dirname + '/production/build/',
	publicPath: "production/",
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: [/node_modules/, /production/],
        query: {
          presets: ['env', 'react']
        }
      },
	  {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: [/node_modules/, /production/]
      },
      { 
        test: /\.css$/, 
        loader: "style-loader!css-loader",
        exclude: [/node_modules/, /production/] 
      },
      { 
        test: /\.png$/, 
        loader: "url-loader?limit=100000" ,
        exclude: [/node_modules/, /production/]
      },
      { 
        test: /\.jpg$/, 
        loader: "file-loader" ,
        exclude: [/node_modules/, /production/]
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
        loader: 'url?limit=10000&mimetype=image/svg+xml',
        exclude: [/node_modules/, /production/]
      }
    ]
  },  
};