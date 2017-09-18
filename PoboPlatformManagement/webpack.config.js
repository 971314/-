
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var config = {
     entry:{
         main: './src/js/main.js'
     },
    output:{
        path: path.join(__dirname, '/build'),
        filename:'main.js',
    },
    module:{
        loaders:[
            {test: /\.vue$/, loader: 'vue-loader'},
            {test: /\.js[x]?$/, exclude: /node_modules/, loader: 'babel-loader'},
            {test: /\.less$/, loader: ExtractTextPlugin.extract("css-loader!less-loader")},
            {test: /\.(png|jpe?g|gif)$/, loader: 'url-loader?limit=100000'}
        ]
    },
    plugins:  [
        new ExtractTextPlugin("style.css"),  
        new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
    ]
}

module.exports = config;

