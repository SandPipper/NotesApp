const path = require('path'); // module that provides a way of working with directories and file paths

const autoprefixer = require('autoprefixer'); // postCss plugin to parse CSS and add vendor prefixes to CSS rules
const CopyWebpackPlugin = require('copy-webpack-plugin'); // copies individual files or entire directories to the build directory
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // extract text(css) from bundle, or bundles, into a separate file
const HtmlWebpackPlugin = require('html-webpack-plugin'); // simplifies creation of HTML files to server your webpack bundles
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin'); // webpack plugin for using service workers to cache your external project dependencies
const WebpackMd5Hash = require('webpack-md5-hash'); // plugin to replace a standard webpack chunkhash with md5
const UglifyJSPlugin = require('uglifyjs-webpack-plugin'); // plugin uses UglifyJS v3 to minify your JS

const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin'); // is an opt-in feature that creates a separate file(chunk)
const DefinePlugin = require('webpack/lib/DefinePlugin'); // allows you to create global constants which ca be configured at compile time.
const HMRPlugin = require('webpack/lib/HotModuleReplacementPlugin'); // excanges, adds, or removes modules while an application is running, without a full reload.
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin'); // you can configure global loader options with this plugin and all loaders will receive these options.
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin'); // this plugin will cause the relative path of the module to be displayed when HMR is endled.
const OccurenceOrderPlugin = require('webpack/lib/optimize/OccurrenceOrderPlugin'); // order the modules and chunks by occurrence. More module occurs - smaller id it has, this technique helps to reduce bundle size
const ProgressPlugin = require('webpack/lib/ProgressPlugin'); // to log the progress of a compilation.

//=======================================
//  CONSTS
//---------------------------------------

// process.env property returns an object containing the user environment
const NODE_ENV = process.env.NODE_ENV && process.env.NODE_ENV.trim()
const DEVELOPMENT = NODE_ENV === 'development';
const PRODUCTION = NODE_ENV === 'production';

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || '3000';
const { ORIGIN } = require('./common.config');

//=======================================
// LOADERS
//---------------------------------------

const rules = {
    js: {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
    },

    json: {
        test: /\.json$/,
        loader: 'json-loader',
    },

    jsx: {
        test: /\.jsx?$/,
        loader: 'babel-loader',
    },

    css: {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'resolve-url-loader', 'postcss-loader'],
        }),
    },

    scss: {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'resolve-url-loader', 'postcss-loader', 'sass-loader'],
        }),
    },

    fonts: {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
        query: {
            name: `[name].[ext]`,
            publicPath: '/assets/fonts/',
        }
    },

    images: {
        test: /\.(svg|png|jpg|jpeg|gif)$/,
        loader: 'file-loader',
        query: {
            limit: 10000,
            name: `[name].[ext]`,
            publicPath: '/assets/images/',
        }
    }
};

//=================================
// CONFIG
//---------------------------------
const config = {};

config.entry = {
    polyfills: ['babel-polyfill', './src/application/polyfills.js'],
    main: ['./src/application/index.js'],
};

config.output = {
    filename: 'assets/js/[name].js',
    path: path.resolve('./dist'),
}

config.resolve = {
    extensions: ['.js', '.json', '.jsx'],
    modules: [
        path.resolve('./src'),
        'node_modules',
    ],
};

config.module = {
    rules : [
        rules.js,
        rules.jsx,
        rules.json,
        rules.css,
        rules.scss,
        rules.fonts,
        rules.images,
    ],
};

config.plugins = [
    new LoaderOptionsPlugin({
        debug: !PRODUCTION,
        cache: !PRODUCTION,
        minimize: !PRODUCTION,
        options: {
            postcss: [
                autoprefixer({
                    browsers: ['last 3 versions'],
                }),
            ],
            sassLoader: {
                outputStyle: PRODUCTION ? 'compressed' : 'expanded',
                precision: 10,
                sourceComments: false,
                sourceMap: PRODUCTION,
            },
            cssLoader: {
                minimize: true,
                sourceMap: true,
            },
        },
    }),
    new DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(NODE_ENV),
            PUBLIC_URL: JSON.stringify(ORIGIN),
        },
    }),
    new OccurenceOrderPlugin(true),
    new NamedModulesPlugin(),
    new CommonsChunkPlugin({
        name: 'polyfills',
        chunks: ['polyfills'],
    }),
    // This enables tree shaking of the vendors modules
    new CommonsChunkPlugin({
        name: 'vendor',
        chunks: ['main'],
        minChunks: module => /node_modules/.test(module.resource),
    }),
    new CommonsChunkPlugin({
        name: ['polyfills', 'vendor'].reverse(),
    }),
    new CopyWebpackPlugin([
        {
            from: './src/assets',
            to: 'assets',
            ignore: ['**/*.scss'],
        },
    ]),
    new ExtractTextPlugin({
        filename: 'assets/css/[name].css',
        disable: !PRODUCTION,
        allChunks: true,
    }),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        hash: false,
        inject: 'body',
        chunksSortMode: 'dependency',
        template: 'src/index.html',
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
        },
    }),
];

//===============================
// DEVELOPMENT
//-------------------------------
if (DEVELOPMENT) {
    config.devtool = 'cheap-module-source-map';

    config.entry.main.unshift(
        'react-hot-loader/patch',
        `webpack-dev-server/client?http://${HOST}:${PORT}`,
        'webpack/hot/only-dev-server',
    );

    config.plugins.push(
        new HMRPlugin(),
        new ProgressPlugin(),
    );

    config.devServer = {
        contentBase: path.resolve(__dirname, 'dist'),
        historyApiFallback: true,
        host: HOST,
        port: PORT,
        stats: {
            cached: true,
            cachedAssets: true,
            children: false,
            chunks: false,
            chunkModules: false,
            colors: true,
            modules: false,
            hash: false,
            reasons: true,
            timings: true,
            version: false,
        },
    };
}

//============================
// PRODUCTION
//----------------------------
if (PRODUCTION) {
    config.devtool = 'source-map';

    config.plugins.push(
        new WebpackMd5Hash(),
        new UglifyJSPlugin({
            uglifyOptions: {
                beautify: false,
                ecma: 6,
                compress: true,
                comments: false,
            },
        }),

        // Generate a service worker script that will precache, and keep up to date,
        // the HTML & assets that are part of the Webpack build.
        new SWPrecacheWebpackPlugin({
            // By default, a cache-busting query parameter is append to requests
            // used to populate the caches, to ensure the response are fresh.
            // If a URL is already hashed by Webpack, then there is no concern
            // about it being stale, and the cache-busting can be skipped.
            dontCacheBustUrlsMatching: /\.\w{8}\./,
            filename: 'service-worker.js',
            logger(message) {
                if (message.indexOf('Total precache size is') === 0) {
                    // This message occuers for every build and is a bit too noisy.
                    return;
                }
                console.log(message);
            },
            minify: true,
            // For unknown URLs, fallback to the index page
            navigateFallback: ORIGIN + '/index.html',
            // Ignores URLs starting from /__ (useful for Firebase):
            // https://github.com/facebookincubator/create-react-app/issues/2237#issuecomment-302693219
            navigateFallbackWhitelist: [/^(?!\/__).*/],
            // Don't precache sourcemaps (they're large) and build asset manifest:
            staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
            // Work arround Windows path issue in SWPrecacheWebpackPlugin:
            // https://github.com/facebookincubator/create-react-app/issues/2235
            stripPrefix: path.join(__dirname, 'assets').replace(/\\/g, '/') + '/',
        }),
    );
}

module.exports = config;