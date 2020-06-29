module.exports = {
    mode : process.env.NODE_ENV || 'development',
    entry: {
        app : './source/js/app.js',
    },
    output: {
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: ['/node_modules'],
                use: {
                    loader : 'babel-loader',
                    options : {
                        presets: [
                            '@babel/preset-env',
                        ],
                        plugins : [
                            "@babel/plugin-transform-modules-commonjs",
                            "@babel/plugin-proposal-class-properties",
                            "@babel/plugin-proposal-optional-chaining",
                            "@babel/plugin-proposal-nullish-coalescing-operator",
                            "@babel/plugin-proposal-object-rest-spread",
                            "@babel/plugin-transform-runtime",
                        ]
                    }
                },
            },
        ],
    },
}