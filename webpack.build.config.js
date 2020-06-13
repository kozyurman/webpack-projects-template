const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        port: 8180,
        overlay: {
            warnings: true,
            errors: true
        },
        contentBase: './build'
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            template: './html/index.html',
            filename: 'index.html',
            chunks: ['vendor', 'common', 'index']
        })
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: "/"
    }
});