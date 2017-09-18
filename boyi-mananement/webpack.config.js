/**
 * Created by xiajing on 2016/10/31.
 */
var path = require('path');
var webpack = require ('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = {
    entry:{
        main:'./src/index.js',
        vendors:['./src/lib/bootstrap.min.js']
    },
    output:{
        path: path.join(__dirname,'view'),
        publicPatch:'../',
        filename:'js/[name].js',
        chunkFilename:'js/[id].chunk.js'
    },
    module:{
        loaders:[
            {test:/\.js[x]?$/,exclude: /node_modules/,loader:'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
            {test: /\.(jpg|png|gif)$/,loader: 'url?limit=25000&name=image/[hash].[ext]'},
            {test: /\.woff[2]?$/, loader: "url?limit=10000&minetype=application/font-woff&name=fonts/[hash].[ext]"},
            {test: /\.ttf$/, loader: "url?limit=10000&name=fonts/[hash].[ext]"},
            {test: /\.eot$/, loader: "url?limit=10000&name=fonts/[hash].[ext]"},
            {test: /\.svg$/, loader: "url?limit=10000&name=fonts/[hash].[ext]"},
            {test: /\.html$/, loader: "html" }
        ]
    },
    plugins:[
        new ExtractTextPlugin("css/[name].css"),
        new webpack.ProvidePlugin({ $: "jquery",  jQuery: "jquery",  "window.jQuery": "jquery"  }),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'js/vendors.js'),
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'./src/index.html',
            chunk:['vendors','main'],
            inject:true,
            hash:true,
            minify:{
                removeComments: true,
                collapseWhitespace:false
            }
        })
    ]
}
module.exports = config;