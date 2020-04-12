const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: "development", // 指定模式 开发，生产
  entry: "./src/main.js", // 对象，数组，字符串
  // 出口
  output: {
    filename: 'index.js',
    path: __dirname + '/dist'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      hash: true,
      chunks: ["main"],
      inject: "body",
      // excludeChunks: [],
      title: "webpack——Lession03学习",
      minify: {
        removeComments: true,
        removeAttributeQuotes: true,
        collapseWhitespace: false,
      }
    })
  ],
  devServer: {
    open: true, // 是否在浏览器中自动打开
    port: 8081, // 设置端口号
    host: '127.0.0.1', // 设置访问地址
    historyApiFallback: true, // 访问不存在的路由时进行重定向
    proxy: {
      // 反向代理
      "/m": { // 代理的前缀标识
        target: "https://m.lagou.com", //请求的服务
        changeOrigin: true,
        pathRewrite: {
          "^/m": ""
        }
      }
    }
  },
  module: {
    // 加载转换. css less sass 图片jsx react es6
    rules: [
      {
        test: /.\.css$/, //以css结尾。医生的药房，道士的画符，程序员正则，天下三大奇闻。
        // npm install style-loader css-loader -D
        loader: ["style-loader","css-loader"], //加载css然后将css放置到style标签中
      },
      {
        // npm i less-loader less -D
        // 将less转换为css并加载转换后的css到style
        test: /.\.less$/,
        loader: ["style-loader","css-loader","less-loader"],
      },
      {
        // npm i sass-loader node-sass -D
        test: /.\.scss$/,
        loader: ["style-loader","css-loader","sass-loader"]
      },
      {
        // npm i url-loader -D
        // npm install file-loader -D
        test: /.\.(jpg|jpeg|gif|svg)$/,
        // loader: ["url-loader"],
        use: [
          {
            loader: "url-loader",
            query: {
              limit: "1844560", // 指定图片的大小，当图片字节小于该值时，转换成base64,当图片字节小于该值时，需要安装file-loader
              outputPath: "img", //指定图片放置的文件夹
            }
          }
        ]
      }
    ]
  }
}