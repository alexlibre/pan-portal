// webpack.config.js
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SvgSpriteHtmlWebpackPlugin = require('svg-sprite-html-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');

const devMode = process.env.NODE_ENV !== 'production';

const exclude = /(node_modules|bower_components)/;

const PATHS = {
    src: path.join(__dirname, './src'),
    dist: path.join(__dirname, './dist'),
}
const PAGES_DIR = `${PATHS.src}/pages/`
const PUGS = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'));

const CONFIG = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './assets/js/[name].bundle.js'
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        hot: true
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: exclude,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.pug/,
                exclude: exclude,
                loader: 'pug-loader',
                options: {
                    pretty: true
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: devMode,
                            publicPath: '/'
                        },
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                autoprefixer({}),
                            ],
                            options: {
                                url: false, sourceMap: true }
                        },
                    },
                    'sass-loader',
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                exclude: exclude,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/fonts'
                        }
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/images/',
                        useRelativePath: true
                    }
                }]
            },
            {
                test: /\.(json)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'data/',
                        useRelativePath: true
                    }
                }]
            },
            {
                test: /\.svg$/,
                // exclude: exclude,
                use: SvgSpriteHtmlWebpackPlugin.getLoader()
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: devMode ? 'assets/css/[name].css' : 'assets/css/[name].[hash].css',
            chunkFilename: devMode ? 'assets/css/[id].css' : 'assets/css/[id].[hash].css'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            server: {
                baseDir: [
                    'dist'
                ]
            },
        }, {
            reload: true
        }),
        ...PUGS.map(page => new HtmlWebpackPlugin({
            template: `${PAGES_DIR}/${page}`,
            filename: `./${page.replace(/\.pug/, '.html')}`,
            inject: true
        })),
        new SvgSpriteHtmlWebpackPlugin({
          generateSymbolId: function(svgFilePath, svgHash, svgContent) {
            return path.parse(svgFilePath).base.split('.svg')[0].toString()
          },
        })
    ],
};
module.exports = CONFIG;
