var DashboardPlugin = require('webpack-dashboard/plugin')
var path = require('path')
var webpack = require('webpack')


module.exports = {
    entry: {
        'index': path.join(__dirname, '/../src/index.js'),
    },

    output: {
        /**
         * hot热替换模式不支持chunkhash
         */
        // filename: '[name].[chunkhash].js',
        filename: '[name].js',
        path: path.join(__dirname, '/../dist'),
        sourceMapFilename: '[name].map',
        library: 'dvaAtr',
        libraryTarget: 'umd'
    },

    resolve: {
        extensions: ['.ts', '.js', '.json'],
        // modules: [path.join(__dirname, 'src'), 'node_modules']
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'stage-0'],
                        plugins: ['lodash']
                    }
                },
                exclude: /node_modules|lib/,
            }
        ]

    },

    plugins: [

        // new DashboardPlugin()

    ]
}
