'use strict';

const path = require('path');
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");

module.exports = {
    context: path.join(__dirname, "src"),
    entry: {
        common: './common',
        index: './index'
    },
    output: {
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: { sourceMap: true }
                    },
                    {
                        loader: "postcss-loader",
                        options: { sourceMap: true }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: 'images'
                        }
                    }
                ]
            },
            {
                test: /\.(eot|woff|woff2|ttf)$/,
                use: [
                    {
                        loader: "url-loader?limit=30000&name=[name]-[hash].[ext]",
                        options: {
                            outputPath: 'fonts'
                        }
                    }
                ]
            },
            {
                test: /\.json/,
                loader: "json-loader",
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new DuplicatePackageCheckerPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].bundle.css"
        }),
        new webpack.HashedModuleIdsPlugin({
            hashFunction: "md4",
            hashDigest: "base64",
            hashDigestLength: 8
        })
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
};