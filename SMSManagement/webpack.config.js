
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var config = {
     entry:{
         main: __dirname + '/js/main.js'
     },
    output:{
        path: path.join(__dirname, '/build'),
        filename:'main.js',
    },
    module:{
        loaders:[
            {test: /\.vue$/, loader: 'vue'},
            {test: /\.js[x]?$/, exclude: /node_modules/, loader: 'babel'},
//            {test: /\.css$/, loader: ExtractTextPlugin.extract("css")},
            {test: /\.less$/, loader: ExtractTextPlugin.extract("css!less")},
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
    ],
//    vue: {
//        loaders: {
//            // 配合ExtractTextPlugin使用
////             css: ExtractTextPlugin.extract("css"),
//             less: ExtractTextPlugin.extract("css!less")
////            css: "vue-style!css",
////            less: "vue-style!css!less"
//        },
//    }
}
module.exports = config;

