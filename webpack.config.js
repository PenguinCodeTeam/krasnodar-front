const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const tableMap = {
    'http://127.0.01:4000':'http://127.0.0.1:3000',
    'http://127.0.01:3000':'http://127.0.0.1:8000',
};
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
        host: '127.0.0.1',
        port: 4000,
        proxy: {
            '/api/v1': {
                target: 'http://127.0.0.1:3000',
                router: 'http://127.0.0.1:8000',
                logLevel: 'debug',
                changeOrigin: true
            }
        },
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
