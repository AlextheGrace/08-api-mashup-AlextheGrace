var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: "./src/js/app.js",
    output: {
        filename: './dist/bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader'
                }
            },

            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    watch: true,
    plugins: [
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            server: {
                baseDir: ['dist']
            },
            files: ['./dist/*.html']
        }),
        new Dotenv({
            path: './.env', // Path to .env file (this is the default) 
            safe: false // load .env.example (defaults to "false" which does not use dotenv-safe) switch true false to reveal in console
        })
    ]
}