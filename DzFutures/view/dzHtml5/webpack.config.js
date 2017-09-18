/**
 * Created by xiajing on 2016/8/12.
 */
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var node_modules_dir = path.join(__dirname, 'node_modules');
var deps = [
    'react/dist/react.min.js',
    'react-router/dist/react-router.min.js',
    'react-dom/dist/react-dom.min.js',
]
var config = {
    entry:{
        //register:'./src/baseInfo/js/register.js',//注册
        myInfo:'./src/baseInfo/js/myInfo.js',//我的信息
        joinDz:'./src/baseInfo/js/joinDz.js',//加入东证
        login:'./src/baseInfo/js/login.js',//登录首次app启动加载登录页面
        modifyPass:'./src/baseInfo/js/modifyPass.js',
        commonDzCss:'./src/baseInfo/js/dzCommon.js',
      //  newsList:'./src/baseInfo/js/news-list.js',//东证通知
        //dzIndex:'./src/baseInfo/js/index.js',//首页
        commonDz:['react','react-router','react-dom',
            //'./src/baseInfo/lib/bootstrap.min.js',
        './src/baseInfo/util/native.js',
        './src/baseInfo/util/titleNative.js',
        './src/baseInfo/util/config.js']
    },
    output:{
        path: path.join(__dirname,'dist'),
        publicPath:'../',
        filename:'build/[name].js',
        chunkFilename:'build/require/[id].chunk.js'
    },
    resolve:{
        alias: {}
    },
    module:{
        noParse: [],
        loaders:[
            {test:/\.js[x]?$/,exclude: /node_modules/,loader:'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
            //{test: /\.(jpg|png|gif)$/,loader: 'url?limit=200000&name=../../dist/baseInfo/images/[hash].[ext]'},
            {test: /\.(jpg|png|gif)$/,loader: 'url?limit=25000&name=images/[hash].[ext]'},
            //{test: /\.woff[2]?$/, loader: "url?limit=10000&minetype=application/font-woff&name=fonts/[hash].[ext]"},
            //{test: /\.ttf$/, loader: "url?limit=10000&name=fonts/[hash].[ext]"},
            //{test: /\.eot$/, loader: "url?limit=10000&name=fonts/[hash].[ext]"},
            //{test: /\.svg$/, loader: "url?limit=10000&name=fonts/[hash].[ext]"},
            {test: /\.(htm|html)$/i,loader: 'html-withimg-loader'},
            {
                test: path.resolve(node_modules_dir, deps[0]),
                loader: "expose?React"
            }
        ]

    },
    plugins:[
        new ExtractTextPlugin("css/[name].css"),
        //报错但不退出webpack进程
        new webpack.NoErrorsPlugin(),
        //new webpack.ProvidePlugin({ $: "jquery",  jQuery: "jquery",  "window.jQuery": "jquery"  }),
        new webpack.optimize.CommonsChunkPlugin('commonDz', 'build/commonDz.js'),
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({	//压缩代码
            compress: {
                warnings: false
            },
            except: ['$super', '$', 'exports', 'require']	//排除关键字
        }),
        //登录
        new HtmlWebpackPlugin({
            filename:'user/nav.html',
            template:'html-withimg-loader!'+'./src/baseInfo/html/login.html',
            chunks:['commonDz','commonDzCss','login'],//过滤加载的模块
            inject:true,
            //hash:true,
            minify:{
                removeComments: true,
                collapseWhitespace:true
            }
        }),
        //注册
        //new HtmlWebpackPlugin({
        //    filename:'user/register.html',
        //    template:'html-withimg-loader!'+'./src/baseInfo/html/register.html',
        //    chunks:['commonDz','dzCommonCss','register'],//过滤加载的模块
        //    inject:true,
        //    //hash:true,
        //    minify:{
        //        removeComments: true,
        //        collapseWhitespace:false
        //    }
        //}),
        //我的信息
        new HtmlWebpackPlugin({
            filename:'user/my.html',
            template:'html-withimg-loader!'+'./src/baseInfo/html/myInfo.html',
            chunks:['commonDz','commonDzCss','myInfo'],//过滤加载的模块
            inject:true,
            //hash:true,
            minify:{
                removeComments: true,
                collapseWhitespace:true
            }
        }),
        //加入东证
        new HtmlWebpackPlugin({
            filename:'user/joinDz.html',
            template:'html-withimg-loader!'+'./src/baseInfo/html/joinDz.html',
            chunks:['commonDz','commonDzCss','joinDz'],//过滤加载的模块
            inject:true,
            //hash:true,
            minify:{
                removeComments: true,
                collapseWhitespace:true
            }
        }),
        //修改密码
        new HtmlWebpackPlugin({
            filename:'user/modifyPass.html',
            template:'html-withimg-loader!'+'./src/baseInfo/html/modifyPass.html',
            chunks:['commonDz','commonDzCss','modifyPass'],//过滤加载的模块
            inject:true,
            //hash:true,
            minify:{
                removeComments: true,
                collapseWhitespace:true
            }
        }),
        ////新闻密码
        //new HtmlWebpackPlugin({
        //    filename:'info/news-list.html',
        //    template:'html-withimg-loader!'+'./src/baseInfo/html/news-list.html',
        //    chunks:['commonDz','commonDzCss','newsList'],//过滤加载的模块
        //    inject:true,
        //    //hash:true,
        //    minify:{
        //        removeComments: true,
        //        collapseWhitespace:true
        //    }
        //}),
        //首页信息
        //new HtmlWebpackPlugin({
        //    filename:'index.html',
        //    template:'html-withimg-loader!'+'./src/baseInfo/html/index.html',
        //    chunks:['dzIndex'],
        //    inject:true,
        //    hash:true,
        //    minify:{
        //        removeComments: true,
        //        collapseWhitespace:false
        //    }
        //})
    ]
}
deps.forEach(function (dep) {
    var depPath = path.resolve(node_modules_dir, dep);
    config.resolve.alias[dep.split(path.sep)[0]] = depPath;
    config.module.noParse.push(depPath);
});
module.exports = config