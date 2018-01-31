var BrowserSyncPlugin = require('browser-sync-webpack-plugin');


module.exports = {
    entry: "./src/app.js",
    output: {
        filename:'./dist/bundle.js'
    },
    module: {
        rules: [
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
            server: {baseDir: ['dist']},
            files: ['./dist/*.html']
        })
    ]
}