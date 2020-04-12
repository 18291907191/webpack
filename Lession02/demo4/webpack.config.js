const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 打包时清空dist文件
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 自动接入打包后文件的js到html文件中
module.exports = {
  mode: "development",
  entry: {
    "index": "./src/main.js",
    "my": "./src/my.js"
  },
  output: {
    filename: "[name].bundle.js"
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html", // 指定模板地址 将模板复制一份放入dist文件，并引入打包后的js文件
      // filename: "home.html", // 将打包后的文件名字进行重置
      hash: true, // 为引入的js的地址增加后缀，用于清除缓存
      inject: "body" || true || "head" || false, // 是否将打包后的js嵌入到html文件中，默认为true
      // chunks: ["my","index"], //多出口 入口的属性名，多输出时，指定html引入的打包文件,默认不设置时引入所有打包文件
      excludeChunks: ["my"], //多出口过滤掉要引入的文件，引入除了my以外所有的打包文件
      title: "学习webpack第二回之插件的了解", // 设置html文件的title，需要配合语法使用<title><%= htmlWebpackPlugin.options.title%></title>
      arr: ["测试webpack属性","arr2","arr3"], // 设置arr属性，需要配合语法使用
      minify: {
        removeComments: true, //清除注释
        removeAttributeQuotes: true, //移除双引号
        removeEmptyElements: true, //删除空元素
        collapseWhitespace: true, // 进行折叠去除空格
        // ...
      }, //压缩的一些设置
    }),
  ]
}