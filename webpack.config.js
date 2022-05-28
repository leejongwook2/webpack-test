const path = require("path")
const webpack = require("webpack");
const MyPlugin = require("./myplugin");
const banner = require("./banner.js")
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
    mode: "development",
    entry: {
        main: "./src/app.js",
    },
    output: {
        filename: "[name].js",
        path: path.resolve("./dist"),
    },
    module: {
        rules: [{
            test: /\.js$/, // .js 확장자로 끝나는 모든 파일
            use: [path.resolve('./myloader.js')] // 방금 만든 로더를 적용한다
        },{
            test: /\.js?$/,
            exclude: /(node_modules)/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"],
                },
            },
        },{
            test: /\.css$/,
            use: [
                process.env.NODE_ENV === "production"
                    ? MiniCssExtractPlugin.loader // 프로덕션 환경
                    : "style-loader", // 개발 환경
                "css-loader",
            ],
        },{
            test: /\.txt$/,
            use: "raw-loader",
        },
        {
            test: /\.(png|jpg)$/,
            loader: "file-loader",
            options: {
                publicPath: "./dist/", // prefix를 아웃풋 경로로 지정
                name: "[name].[ext]?[hash]", // 파일명 형식
            },
        }],
    },
    plugins: [
        // new webpack.BannerPlugin({
            // banner: () => `빌드 날짜: ${new Date().toLocaleString()}`,
        // })
        // new webpack.BannerPlugin(banner),
        // new webpack.DefinePlugin({
        //     VERSION: JSON.stringify("v.1.2.3"),
        //     PRODUCTION: JSON.stringify(false),
        //     MAX_COUNT: JSON.stringify(999),
        //     "api.domain": JSON.stringify("http://dev.api.domain.com"),
        // })
        new HtmlWebpackPlugin({
            template: './public/index.html', // 템플릿 경로를 지정
            templateParameters: { // 템플릿에 주입할 파라매터 변수 지정
                env: process.env.NODE_ENV === 'development' ? '(개발용)' : '',
            },
            hash: true, // 정적 파일을 불러올때 쿼리문자열에 웹팩 해쉬값을 추가한다
        }),
        new CleanWebpackPlugin(),
        ...(process.env.NODE_ENV === "production"
            ? [new MiniCssExtractPlugin({ filename: `[name].css` })] : []),
    ]
}

