const
  path = require('path')
  , webpack = require('webpack')
  , webpackMerge = require('webpack-merge')
  , webpackBase = require("./webpack.base.js")
  , browserSyncConfig = require('./browserSync.config')
  , styleLoadersConfig = require('./styleLoaders.config')()

  // Webpack Plugin
  , BrowserSyncPlugin = require('browser-sync-webpack-plugin')
  , HtmlWebpackPlugin = require('html-webpack-plugin')
  , DefinePlugin = require('webpack/lib/DefinePlugin')
  , UglifyJsPlugin = require('uglifyjs-webpack-plugin')
  , CleanWebpackPlugin = require('clean-webpack-plugin')
  , LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin')
  , ExtractTextPlugin = require('extract-text-webpack-plugin')
  // , InlineManifestPlugin = require('inline-manifest-webpack-plugin')
  // , ManifestPlugin = require('webpack-manifest-plugin')
  , WebpackChunkHash = require("webpack-chunk-hash")
  // , ChunkManifestPlugin = require('chunk-manifest-webpack-plugin')
  , AppCachePlugin = require('appcache-webpack-plugin')
  , SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
  , OfflinePlugin = require('offline-plugin')
;


module.exports = webpackMerge(webpackBase, {
  bail: true,

  output: {
    path: path.resolve('./build'),
  },

  module: {
    rules: [
      // Style
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            styleLoadersConfig.cssLoader,
            {
              loader: 'postcss-loader',
            },
            styleLoadersConfig.sassLoader,
          ],
        })
      },
    ]
  },


  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve('./static', 'view', 'index.pug'),   // 模板位置
      //filename: '../index.html',
      favicon: path.resolve('./static', 'favicon.ico'),
      // chunks: ['manifest', 'main', 'vendor'],
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


    // new SWPrecacheWebpackPlugin(
    //   {
    //     cacheId: 'gulp-temp',
    //     filename: 'service-worker.js',
    //     verbose: true,
    //   }
    // ),

    new webpack.HashedModuleIdsPlugin(),
    new WebpackChunkHash(),

    // function() {
    //   this.plugin('done', (stats)=> {
    //     require('fs').writeFileSync(
    //       path.resolve('./build', 'manifest.json'),
    //       // path.join(__dirname, "build", "manifest.json"),
    //       JSON.stringify(stats.toJson()));
    //   });
    // },

    // new ManifestPlugin(),
    // new ChunkManifestPlugin({
    //   filename: "manifest.json",
    //   manifestVariable: "webpackManifest"
    // }),
    //
    // new InlineManifestPlugin({
    //   name: 'webpackManifest',
    // }),

    new OfflinePlugin({
      safeToUseOptionalCaches: true,

      caches: {
        main: [],
        additional: [':externals:'],
        optional: [':rest:'],
        excludes: [
          '**/.*',
          '**/*.map',
          'index.html',
        ],
      },

      ServiceWorker: {
        output: 'service-worker.js',
        cacheName: 'gulp-temp',
        events: true,
        minify: true,
      },
      AppCache: {
        caches: ['main', 'additional', 'optional'],
        // directory: './',
        NETWORK: null,
        events: true,
      }
    }),


    // new AppCachePlugin({
    //   network: null,  // No network access allowed!
    //   fallback: [],
    //   settings: ['prefer-online'],
    //   exclude: ['index.html', 'service-worker.js'],  // Exclude file.txt and all .js files
    //   // output: path.resolve('./build', 'appcache', 'manifest.appcache'),
    //   output: 'manifest.appcache',
    // }),

    new CleanWebpackPlugin(['build'], {
      root: path.resolve('./'),
      verbose: true,
      dry: false,
    }),

    new DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),

    // Uglify Js
    new UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        screw_ie8: true,
        warnings: false,
        drop_debugger: true,
        drop_console: true,
        collapse_vars: true,
        reduce_vars: true,
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      },
      sourceMap: true,
    }),

    new ExtractTextPlugin({
      filename: 'style/[name].[chunkhash:8].min.css',
      disable: false,
      allChunks: true,
    }),

    new LoaderOptionsPlugin({
      options: {
        context: '/',
        postcss: styleLoadersConfig.postcssOptions,
      },
    }),

    new BrowserSyncPlugin(browserSyncConfig({
      server: {
        baseDir: 'build',
      },
      port: 4000,
      ui: {
        port: 4001,
      },
      logLevel: "warn",
    }), {
      reload: false,
    }),
  ],
});