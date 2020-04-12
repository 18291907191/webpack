[TOC]

# 前端构建工具Webpack的学习

## 什么是webpack？

> 百度词条：“Webpack 是一个开源的前端打包工具。Webpack 提供了前端开发缺乏的模块化开发方式，将各种静态资源视为模块，并从它生成优化过的代码。要使用Webpack 前须先安装Node.js。”

## webpack可以做什么？

1. 优化：删除多余的冗余代码，压缩；
2. 转换：jsx，es6，es6的语法转换，less，sass等预编译处理器的转换；
3. 打包：合并多余文件，减少请求次数，加快响应；
4. devServer代理解决跨域问题。
5. ......

## 目标

1. 通过webpack完成对公司现有项目从0开始的定制化搭建；
2. 摒弃现在脚手架中冗余的代码及配置；
3. 了解wbpack的一些原理，流程。

## 结构

```js
module.exports = {
  mode: "development", // 模式 =》 开发模式，生产模式
  entry: 'src/main.js', // 入口
  output: __dirname, // 输出
  module: {}, // 加载转换=》less || sass || 图片|| j'sx || es6 || es7
  plugins: [], // 插件
  devServer: {}, // 服务代理
  resolve: {}, // 特殊问题的解决方案
}
```

## 基本配置与命令行操作

### 命令行操作

安装：

```
npm i webpack webpack -cli -g
```

webpack：webpack的核心模块

webpack-cli：执行webpack相关的命令行

```
webpack -v 查看当前webpack的版本号
webpack --mode development/production 指定webpack的运行模式为开发模式/生产模式，默认是生产模式
webpack --config filename 指定webpack命令依赖的配置文件，默认是webpack.config.js文件
webpack src/main.js --output filename 指定输出文件为filename,默认输出文件为dist/main.js
```

###基本配置

1. 在项目根目录执行npm init -y生成package.json文件
2. 在scripts对象中添加命令

```
"scripts": {
	"build": "webpack src/main.js --mode development"
}
```

3. 执行npm run build命令时，就相当于执行了webpack src/main.js --mode development命令

## 属性详解

### entry

```js
module.exports = {
	// 字符串：单个入口单个输出
  // 数组：多个入口单个输出
  // 对象：多个入口多个输出 对象的属性名one和two可通过name作为输出的文件的名字前缀
	entry: "src/one.js" || ["src/one.js","src/two.js"], {
	one: "src/one.js",
	two: "src/two.js"
	}，
  output: {
    filename: "[name].blund.js", // 这里的name就是entry为对象时的属性名
  }, 
}
```

### output

```js
module.exports = {
  // 对象 {filename:'打包后文件的名字', path: '打包后文件的路径'}
  output: {
    filename: "[name].blund.js", // 这里的name就是entry为对象时的属性名。
    filename: "[hash].blund.js", // 这里的hash及时一个随机的一个哈希字符，确保打包后文件名字的唯一性
    path: __dirname + '/dist', //打包后就是在webpack当前目录下的dist下
  }
}
```

### plugins

webpack依赖于Node.js。因此引入依赖模块时需要使用node.js的模块导入

####clean-webpack-plugin

> 可以实现在打包时，清空原有的内容，该插件每次迭代使用方法差距较大需要关注官方文档
>
> 下载：npm i clean-webpack-plugin -D

####html-webpack-plugin

> 默认会在dist文件下生成一个html文件并引入打包好的js文件，详细功能见demo
>
> 下载：npm i html-webpack-plugin -D

#### extrace-text-webpack-plugin

> 拆分打包后的css文件到单独的css文件夹，而不是加载到HTML的style中
>
> 下载：npm i extract-text-webpack-plugin

### module

各个模块的加载转换预编译处理器=》css，es6抓换成es5等。

####css

```js
// npm install style-loader css-loader -D
module: {
  rules: [
    {
      test: /.\.css$/, //医生的药房，道士的画符，程序员正则，天下三大奇闻。
      // npm install style-loader css-loader -D
      // loader: ["style-loader","css-loader"], //加载css然后将css放置到style标签中
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
      }) // 拆分打包后的css文件 需在插件中注册
    },
  ]
},
```

#### less

```js
// npm install style-loader css-loader less less-loader -D
module: {
  rules:[
    {
      // npm i less-loader less -D
      // 将less转换为css并加载转换后的css到style
      test: /.\.less$/,
      // loader: ["style-loader","css-loader","less-loader"],
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: ["css-loader","less-loader"]
      }) // 拆分打包后的css文件 需在插件中注册
    },
  ]
},
```

#### sass

```js
// npm install style-loader css-loader sass-loader node-sass -D
module: {
  rules: [
    {
      // npm i sass-loader node-sass -D
      test: /.\.scss$/,
      // loader: ["style-loader","css-loader","sass-loader"]
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: ["css-loader","sass-loader"]
      }) // 拆分打包后的css文件 需在插件中注册
    },
  ]
},
```

#### image

```js
// npm i url-loader file-loader -D
module: {
  rules: [
    {
      // npm i url-loader file-loader -D
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
    },
  ]
},
```

#### jsx|es6|es7|es8|es9...

```js
// npm install babel-loader babel-core babel-preset-react babel-preset-env -D
module: {
  rules: [
    {
      // npm install babel-loader babel-core babel-preset-react babel-preset-env
      test: /.\.(js|jsx)/,
      exclude: /node_modules/, // 排除指定的文件
      loader: "babel-loader",
      query: {
        presets: [
          "babel-preset-react",
          "babel-preset-env"
        ]
      }
    }
  ]
},
resolve: {
  extensions: [".js",".jsx"], //解决.jsx不识别的问题
},
```

注：

1. 之所以要配置这些东西，是为了支持在js中引入这些css/img静态资源文件，并将这些资源打包加载。
2. 需要注意的是loader:["stye-loader","css-loader"],这两个必须在开始且顺序不能乱，因为他的执行是从右开始执行，比如说less转换成css=》加载到style=》extract拆分到单独的路径。

### devServer

设置webpack的服务模块，可设置服务代理，解决跨域问题

```js
module.exports = {
	devServer: {
    open: true, // 是否在浏览器中自动打开
    port: 8081, // 设置端口号
    host: '127.0.0.1', // 设置访问地址
    historyApiFallback: true, // 访问不存在的路由时进行重定向
    proxy: {
      // 反向代理
      "/mock": { // 代理的前缀标识
        target: "https://m.lagou.com", //请求的服务
        changeOrigin: true,
        pathRewrite: {
          "^/mock": ""
        }
      }
    }
  },  
} 
```



## demo

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  mode: "development", // 开发模式/生产模式 默认是生产
  entry: "./src/main.js", // 对象(多入口多输出)，数组（多入口，单输出），字符串（单入口，单输出）
  output: {
    filename: "index.js",
    path: __dirname + "/dist"
  }
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html", // 指定模板地址 将模板复制一份放入dist文件，并引入打包后的js文件
			filename: "index.html", // 打包后的文件的名字
      inject: "body" || 'head' || true || false, // 打包后的html是否引入js文件，或引入js文件的位置, 默认为true
      chunks: ["one","two"], // 多出口时 指定html引入哪些出口文件
      excludeChunks: ["one","two"], // 多出口时，指定html过滤掉那些出口文件, 默认不设置时引入所有输出文件
      title: "学习webpack", // 需要配合模板语法来使用 <%= htmlWebpackPlugin.options.title%>
      minify: {
        removeCommonts: true, // 清除注释
        removeAttributeQuotes: true, // 移除双引号
        removeEmptyElements: true, // 删除空元素
        collapseWhitespace: true, // 进行折叠去除空格
        //......
      }, // 压缩的一些设置
    }),
    new ExtractTextPlugin("css/styles.css"), // 指定分离后的css文件路径 需要配合module下rules下ExtractTextPlugin.extract({})来使用
  ],
    module: {
    // 加载转换. css less sass 图片jsx react es6
    rules: [
      {
        test: /.\.css$/, //医生的药房，道士的画符，程序员正则，天下三大奇闻。
        // npm install style-loader css-loader -D
        // loader: ["style-loader","css-loader"], //加载css然后将css放置到style标签中
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        // npm i less-loader less -D
        // 将less转换为css并加载转换后的css到style
        test: /.\.less$/,
        // loader: ["style-loader","css-loader","less-loader"],
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader","less-loader"]
        })
      },
      {
        // npm i sass-loader node-sass -D
        test: /.\.scss$/,
        // loader: ["style-loader","css-loader","sass-loader"]
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader","sass-loader"]
        })
      },
      {
        // npm i url-loader file-loader -D
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
      },
      {
        // npm install babel-loader babel-core babel-preset-react babel-preset-env
        test: /.\.(js|jsx)/,
        exclude: /node_modules/, // 排除指定的文件
        loader: "babel-loader",
        query: {
          presets: [
            "babel-preset-react",
            "babel-preset-env"
          ]
        }
      }
    ]
  },
  resolve: {
    extensions: [".js",".jsx"], //解决.jsx不识别的问题
  },
	devServer: {
    open: true, // 是否在浏览器中自动打开
    port: 8081, // 设置端口号
    host: '127.0.0.1', // 设置访问地址
    historyApiFallback: true, // 访问不存在的路由时进行重定向
    proxy: {
      // 反向代理
      "/mock": { // 代理的前缀标识
        target: "https://m.lagou.com", //请求的服务
        changeOrigin: true,
        pathRewrite: {
          "^/mock": ""
        }
      }
    }
  },  
}
```