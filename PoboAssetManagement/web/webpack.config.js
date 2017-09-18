
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var config = {
     entry:{
         main: './js/main.js'
     },
    output:{
        path: './js',
        filename: 'build.js',
    },
    module:{
        loaders:[
            {test: /\.vue$/, loader: 'vue'},
            {test: /\.js[x]?$/, exclude: /node_modules/, loader: 'babel'},
//            {test: /\.css$/, loader: ExtractTextPlugin.extract("css")},
//            {test: /\.less$/, loader: ExtractTextPlugin.extract("css!less")}
        ]
    },
//    plugins:  [
////      new webpack.optimize.CommonsChunkPlugin('common.js'),
//      new ExtractTextPlugin("aaaaa.css"),  
//    ],
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

