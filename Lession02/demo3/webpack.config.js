// 清除打包后多余文件的插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  mode: "development",
  entry: {
    a: "./src/one.js",
    b: "./src/two.js"
  },
  output: {
    filename: "[name].bundle.js"
  },
  // plugins类型是一个数组，该数组的每一个元素就是要使用的plugin(插件)
  plugins: [
    new CleanWebpackPlugin()
  ]
}