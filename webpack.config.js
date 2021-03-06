const htmlPlugins = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {

    mode: 'development',
    optimization: {
        minimizer: [new OptimizeCssAssetsPlugin()],
    },
    module: {
        rules: [
            {
                test:/\.css$/,
                exclude:/styles\.css$/,
                use:[
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                exclude: /(ngfactory|ngstyle).js$/,
                use: 'source-map-loader'
            },
            {
                test:/styles\.css$/,
                use:[
                    miniCssExtractPlugin.loader,
                    'css-loader',
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {minimize:false},
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options :{ 
                            esModule: false,
                            name: 'assets/[name].[ext]',
                        },
                    },
        ],
            },
        ]
    },
    plugins:[
        new htmlPlugins({
           template: './src/index.html',
           filename: './index.html'
        }),
        new miniCssExtractPlugin({
            filename: '[name].css',
            ignoreOrder: false,
         }),
    ]

}