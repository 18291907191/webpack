module.exports = {
  mode: "development", // 指定运行模式 开发生产
  // 设置成一个数组
  entry: "./src/main.js", // 指定入口
  output: {
    filename: 'main.js',
    // path: path.resolve(__dirname,'dist')
    path: __dirname + '/dist'
  }
}