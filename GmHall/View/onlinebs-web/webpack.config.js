var path = require('path');
var webpack =require('webpack');
var openBrowser = require('open-browser-webpack-plugin');
var ExtractTextPlugin =require("extract-text-webpack-plugin");//分离打包css文件
var HtmlWebpackPlugin = require('html-webpack-plugin');
var config = {
    devServer: {
        port: 6001,
       // port: 6001,
        hot: true,
        contentBase: './',
        progress: true,
        inline: true,
        historyApiFallback: true
    },
    entry:{
        main: './src/main.js',
        //第三方插件单独打包
        vendors:['./src/lib/bootstrap.min.js','./src/lib/parsley/parsley.js',
            './src/lib/DatePicker.js','./src/lib/jquery.ui.datepicker-zh-CN.js',
            './src/lib/jquery-ui-1.10.3.custom.js','./src/lib/jquery-1.12.3.min.js',
            './src/lib/placeholder.js'
            //'./src/lib/virtualkeyboard/jquery.keyboard.js',
            //'./src/lib/virtualkeyboard/jquery.mousewheel.js',
        ]
    },
    output: {
        path: path.join(__dirname,'dist'),
        publicPath: '',
        filename:'js/[name].js',
        chunkFilename: "js/[id].chunk.js"
    },
    module: {
        loaders: [
            {test: /\.js[x]?$/,exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,loader: 'babel'},
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
            {test: /\.(jpg|png|gif)$/,loader: 'url?limit=25000&name=image/[hash].[ext]'},
            {test: /\.woff[2]?$/, loader: "url?limit=10000&minetype=application/font-woff&name=fonts/[hash].[ext]"},//url-loader
            {test: /\.ttf$/, loader: "url?limit=10000&name=fonts/[hash].[ext]"},
            {test: /\.eot$/, loader: "url?limit=10000&name=fonts/[hash].[ext]"},
            {test: /\.svg$/, loader: "url?limit=10000&name=fonts/[hash].[ext]"},
            {test: /\.vue$/, loader: 'vue'},
            {test: /\.html$/, loader: "html"}
        ]
    },
    plugins: [
        //new openBrowser({url: 'http://localhost:6001'}),
        new ExtractTextPlugin("css/[name].css"),//合并css
        new webpack.ProvidePlugin({ $: "jquery",  jQuery: "jquery",  "window.jQuery": "jquery"  }),
        new webpack.optimize.UglifyJsPlugin(
            {compress:{warnings:false}
            }),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'js/vendors.js'),
        new HtmlWebpackPlugin({                        //根据模板插入css/js等生成最终HTML
            favicon:'./src/image/login-icon.png', //favicon路径
            filename:'./index.html',    //生成的html存放路径，相对于 path
            template:'index.html',    //html模板路径
            chunks:['vendors','main'],
            inject:true,    //允许插件修改哪些内容，包括head与body
            //hash:true,    //为静态资源生成hash值
            minify:{    //压缩HTML文件
                removeComments:true,    //移除HTML中的注释
                collapseWhitespace:true,  //删除空白符与换行符
            },
        })
    ]
};
module.exports=config;