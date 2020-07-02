
console.log(" ::::::::::::::::: ", process.env.NODE_ENV)
module.exports = {
    mode : process.env.NODE_ENV || 'development',
    // entry: {
    //     app : './source/js/app.js',
    //     Slick : './source/js/Slick.js',
    // },
    // output: {
    //     filename: '[name].js',
    // },
    optimization : {
        splitChunks : {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    name: 'lib',
                }
            }
        }
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
                            [
                                "module-resolver", {
                                    "root": ["./source/js/"],
                                }
                            ],
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