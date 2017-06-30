
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
var webpack = require('webpack')
var path = require('path')
var webpack = require('webpack')

module.exports = Merge(CommonConfig, {
    plugins: [

        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false
        }),

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),

    ]
})
