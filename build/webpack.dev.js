
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
var webpack = require('webpack')
var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

// const config = require(path.join(__dirname, '/../config.js')) || {}

module.exports = Merge(CommonConfig, {
    
    watch: true,

    devtool: 'cheap-module-source-map',

    // devServer: {
    //     port: config.port || 8888,
    //     host: config.host || 'localhost',
    //     historyApiFallback: true,
    //     noInfo: false,
    //     stats: 'minimal',
    //     /**
    //      * https://github.com/webpack/webpack/issues/1151
    //      */
    //     inline: true,
    //     hot: true
    // },

    plugins: [

        // new HtmlWebpackPlugin({
        //     template: 'src/index.html',
        //     chunksSortMode: 'dependency',
        //     inject: 'head'
        // }),

        //http://stackoverflow.com/questions/30835213/react-from-npm-cannot-be-used-on-the-client-because-development-is-not-defined
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
        })
    ]
})