'use strict';

const webpack = require('webpack');
const path = require( 'path' );

module.exports = {
    // https://webpack.js.org/configuration/entry-context/
    entry: './src/index.js',

    // https://webpack.js.org/configuration/output/
    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015', 'react', 'env']
                        }
                    },
                ],
            }
        ]
    },

    // Useful for debugging.
    devtool: 'source-map'
};