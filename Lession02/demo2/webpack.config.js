module.exports = {
  mode: "development",
  // 设置成数组，数组的每一个元素及是需要打包的文件
  // 科室是字符串，数组，对象
  entry: {
    one: "./src/one.js",
    two: "./src/two.js"
  },
  output: {
    // 将入口entry对象的属性名，替换[name]
    filename: "[name].bundle.js"
  }
}