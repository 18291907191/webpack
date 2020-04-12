module.exports = {
  mode: "development", // --mode 指定运行环境
  entry: "./src/index.js", // 指定入口文件
  // 出口，是一个对象
  output: {
    // filename: "haha.js", // 指定打包的文件名字 默认打包到dist文件夹下 dist/haha.js
    // filename: "my/haha.js", // 指定打包的文件名字 dist/my/haha.js
    filename: "haha.js",
    path: __dirname + "/my" // 绝对地址当前文件所在的路径
  }
}