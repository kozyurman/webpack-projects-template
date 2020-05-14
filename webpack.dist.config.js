const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');

const path = require('path');

module.exports = merge(common, {
    mode: 'production',
    plugins: [
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: (loader) => [
                                require('cssnano')({
                                    preset: [
                                        'default',
                                        {discardComments: { removeAll: true }}
                                    ]
                                })
                            ]
                        }
                    }
                ]
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/dist/"
    }
});