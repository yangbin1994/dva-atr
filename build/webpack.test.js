module.exports = {

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

    }
}
