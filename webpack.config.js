const Config = require('./config');
const path = require('path');
const webpack = require('webpack');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const configuration = require('./webpack.config.js');
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebPackPlugin = require('html-webpack-plugin');// 打包html
const TerserPlugin = require('terser-webpack-plugin');// 打包js
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //打包css
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const PrerenderSpaPlugin = require('prerender-spa-plugin')//页面静态化
const { CleanWebpackPlugin } = require('clean-webpack-plugin');//清除打包文件
// const DirectoryNamedWebpackPlugin = require("directory-named-webpack-plugin");
// const DirectoryNamedWebpackPlugin = 
const ResolverConvert = require("./resolverplugin");
const SimpleProgressWebpackPlugin = require( 'simple-progress-webpack-plugin' )
const HappyPack = require('happypack')
const os = require('os')
// 创建共享进程池
const HappyPackThreadPool = HappyPack.ThreadPool({size:os.cpus().length})

const devMode =  JSON.parse(process.env.npm_config_argv).cooked[1] == 'dev' ? true : false;
const _BASE_URL_ = devMode ?'': Config.baseUrl;

let pluginsList = [
  new webpack.DefinePlugin({
    'process.env.BASE_URL': '\"'+_BASE_URL_+'\"'
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: devMode?'./css/[name].[hash].css' : './css/[name].css',
      chunkFilename: devMode ? 'bin.[id].[hash].css' : 'bin.[id].css'
    }),
    new CleanWebpackPlugin(),

    new HtmlWebPackPlugin({
      template: path.join(__dirname, 'src/index.html'),
      filename: 'index.html',
      // inject: true,
      minify: false
        // chunksSortMode: 'dependency'
    }),

    new CopyPlugin({
      patterns: [
        { from: "static", to: "" }
      ],
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
       messages: ['You application is running here http://localhost:3000'],
       notes: ['Some additionnal notes to be displayed unpon successful compilation']
    },
    devServer: {
      quiet: true,
    },
     clearConsole: true,
   }),
    new SimpleProgressWebpackPlugin(),
    new ResolverConvert({
         convert: {
          from: '@npkg/tinymce-plugins',
          to: './src/components/libsm'
         }
    })
]

devMode? '' : pluginsList.push(new PrerenderSpaPlugin({
  staticDir: path.join(__dirname, Config.rootDir),
  routes: ['/','/list.html','/search.html','/zt.html'],
  renderAfterDocumentEvent: 'render-active',
  minify: false,
  postProcess(context) {
    // For example: /dist/dir/special.html/index.html -> /dist/dir/special.html
    if (context.route.endsWith('.html')) {
      context.outputPath = path.join(__dirname, Config.rootDir, context.route)
    }else{
      context.outputPath = path.join(__dirname, Config.rootDir, context.route,'index.html')
    }
    return context
  }
}),)

let cssLoader = [
  {
    loader: 'style-loader',
    options: { 
      injectType: devMode? 'singletonStyleTag' :'linkTag'
   }
  }]
  devMode ? '' : cssLoader.push({
    loader: "file-loader",
    options: {
        name: "css/[name].css",
    },
  },{
    loader: "extract-loader",
    options:{
      publicPath: '../'
    }
  })
  cssLoader.push(
  { 
    loader: 'css-loader',
    options: {
      importLoaders: 1,
    }
   } 
 ,{loader: 'postcss-loader', options:{
     plugins: [
        require('autoprefixer')({
           overrideBrowserslist: ['last 5 version', '>1%', 'ios 7']
        })
     ]
   }
  })
// console.log(cssLoader)
module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: devMode?'./js/[name].[hash].js' : './js/[name].js',
    path: path.join(__dirname, Config.rootDir)
  },
  mode: devMode ? "development" :"production",
  stats: 'errors-only',
  // devtool: 'inline-source-map',
  plugins: pluginsList,
  optimization:{
      minimizer:[
          new TerserPlugin({
            terserOptions: {
              ecma: undefined,
              warnings: false,
              parse: {},
              compress: {
                drop_console: true,
                drop_debugger: false,
                pure_funcs: ['console.log'] // 移除console
              }
            },
          })
      ],
      usedExports: true, // 只导出外部使用到的代码
      minimize: true, // 开启JS压缩去除未使用的代码
      splitChunks: { // 分割代码块，即抽离公共模块
        cacheGroups: {
          common: { // 
            chunks: "initial", // 同步引入
            test: /[\\/]assets[\\/]/,
            minSize: 0, // 文件大小为0字节以上才抽离
            name: "common", // 定义抽离出的文件的名称
            enforce: true
         },
         vender: { //
          chunks: "initial", // 同步引入
          test: /[\\/]node_modules[\\/]/,
          minSize: 0, // 文件大小为0字节以上才抽离
          name: "vender", // 定义抽离出的文件的名称
          enforce: true
         },
        }
      }
  },
  module: { //第三方模块
     rules : [
          {
            test: /\.js$/,
            use: ['babel-loader'],
            include: path.resolve('src'),
            exclude: /node_modules/
          },
         { test: /\.vue$/,
           loader: 'vue-loader',
           options:{
            extractCSS: true,
            // exclude: /node_modules/
           },
          },
         { test: /\.css$/, use: cssLoader
        // exclude: ['common.css']
        }, 
        // { test: /\.(sass|scss)$/, use: [ MiniCssExtractPlugin.loader,
        //   { 
        //     loader: 'css-loader',
        //     options: {
        //       importLoaders: 1,
        //     },
           
        //    },
        //    {loader: 'postcss-loader', options:{
        //     plugins: [  require('autoprefixer')({
        //       overrideBrowserslist: ['last 5 version', '>1%', 'ios 7']
        //    })]
        //   }
        //    }, {
        //     loader: 'sass-loader'
        //   }
        //   ]
        //   // exclude: ['common.css']
        //   },
        // // 
        // { test: /\.(sass|scss)$/, use: [devMode ?{ 
        //     loader: 'style-loader' ,
        //     options:{ injectType: 'singletonStyleTag' },
        // }: { loader: MiniCssExtractPlugin.loader,
        //   options:{
        //     publicPath: '../'
        //   }
        // },
        //  { 
        //   loader: 'css-loader',
        //   options: {
        //     importLoaders: 1,
        //   },
         
        //  },
        //  {loader: 'postcss-loader', options:{
        //   plugins: [  require('autoprefixer')({
        //     overrideBrowserslist: ['last 5 version', '>1%', 'ios 7']
        //  })]
        // }
        //  }, {
        //   loader: 'sass-loader'
        // },
        // {
        //    loader: "sass-resources-loader",
        //    options: {
        //     resources: path.resolve('src/assets/scss/common.scss'),
        //   }
        // }
        // ]
        // // exclude: ['common.css']
        // }, 
        { test: /\.(sass|scss)$/, use: [devMode ?{ 
              loader: 'style-loader' ,
              options:{ injectType: 'singletonStyleTag' },
          }: { loader: MiniCssExtractPlugin.loader,
            options:{
              publicPath: '../'
            }
          },
           { 
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
           
           },
           {loader: 'postcss-loader', options:{
            plugins: [  require('autoprefixer')({
              overrideBrowserslist: ['last 5 version', '>1%', 'ios 7']
           })]
          }
           }, {
            loader: 'sass-loader'
          },
          {
             loader: "sass-resources-loader",
             options: {
              resources: path.resolve('src/assets/scss/common.scss'),
            }
          }
          ]
          // exclude: ['common.css']
          }, 
        { test: /\.ttf|.woff|.woff2|.eot|svg$/, use: 'url-loader' },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 1024 * 10, // 10KB以下会被转成base64
            esModule: false,
            name: 'img/[name].[ext]'
          }
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 1024*20,
            name: 'media/[name].[ext]'
          }
        }
     ]
  },
  resolve: {
    modules: [path.join(__dirname, "node_modules")],
    // externals: {
    //   "vue": "vue"
    // },
    extensions: ['.js','.vue','.json'],
    alias: {
        '@': path.join(__dirname,'./src'),
        '@libs': '@npkg/tinymce-plugins',
        '@img': path.join(__dirname,'./src/assets/images/')
    },
    // plugins: [
    //   new HelloWorldPlugin()
    // ]
  }
}