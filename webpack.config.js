const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['ts-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.less$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "less-loader",
                ],
            },
        ]
    },
    devServer: {
        host: '0.0.0.0',
        port: 3000,
        client: {
            overlay: false
        }
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: __dirname + "/src/index.html",
            title: "Webpack App",
            inject: 'body'
        }),
        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin()
    ],
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['*', '.tsx', '.ts', '.js'],
    }
}