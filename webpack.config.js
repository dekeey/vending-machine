const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

//=========================================================
//  VARS
//---------------------------------------------------------
const NODE_ENV = process.env.NODE_ENV;

const ENV_DEVELOPMENT = NODE_ENV === 'development';
const ENV_PRODUCTION = NODE_ENV === 'production';
const ENV_TEST = NODE_ENV === 'test';


//=========================================================
//  CONFIG
//---------------------------------------------------------
const config = module.exports = {};

config.resolve = {
  extensions: ['.js', '.jsx'],
  modules: [
    path.resolve('.'),
    'node_modules',
  ]
};

config.plugins = [
  new LoaderOptionsPlugin({
    debug: false,
    minimize: true,
    options: {
      postcss: [
        autoprefixer({
          browsers: ['> 1%', 'last 4 versions'],
          cascade: false
        })
      ],
      sassLoader: {
        outputStyle: 'compressed',
        precision: 10,
        sourceComments: false
      }
    }
  }),
  new DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
  })
];



//=========================================================
//  LOADERS
//---------------------------------------------------------
const rules = {
  js: {
    loader: 'babel-loader',
    include: [
      path.resolve(__dirname, 'src'),
    ],
    test: /\.(js|jsx)$/,
  },

  scss: {
    test: /\.scss$/,
    loaders: ['style','css','postcss','sass'],
  },

  css: {
    test: /\.css$/,
    loaders: ['style','css','postcss'],
  },

  images: {
    test: /\.(png|svg|jpg)$/,
    loader: 'url-loader?limit=1024&name=assets/img/[hash].[ext]'
  },

  fonts: {
    test: /\.(ttf|eot|woff|woff2)$/,
    loader: 'url-loader?limit=1024&name=assets/fonts/[name].[ext]'
  },

  json: {test: /\.json$/, loader: 'json'},

};

//=====================================
//  DEVELOPMENT or PRODUCTION
//-------------------------------------
if (ENV_DEVELOPMENT || ENV_PRODUCTION) {
  config.entry = {
    main: [
      './src/main.jsx',
      'babel-polyfill'
    ]
  };

  config.output = {
    filename: '[name].js',
    path: path.resolve('./build')
  };

  config.module = {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint',
        include: [
          path.resolve(__dirname, 'src'),
        ],
        enforce: 'pre'
      },
      rules.js,
      rules.css,
      rules.fonts,
      rules.images,
      rules.scss,
      rules.json
    ],
  };

  config.plugins.push(
    new HtmlWebpackPlugin({
      filename: 'index.html',
      hash: false,
      inject: 'body',
      template: './src/index.html'
    })
  );
  
  
  
}


//=====================================
//  DEVELOPMENT
//-------------------------------------

if (ENV_DEVELOPMENT) {
  config.devtool = 'source-map';

  config.entry.main.unshift(
    'webpack-hot-middleware/client'
  );
  config.devServer = {
    noInfo: true,
    log: console.log,
    stats: 'errors-only'
  };

  config.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HotModuleReplacementPlugin()
  );
}


//=====================================
//  PRODUCTION
//-------------------------------------

if (ENV_PRODUCTION) {

  config.devtool = 'hidden-source-map';
  config.output.filename = '[name].[hash].js';

  config.module = {
    rules: [
      rules.js,
      {test: /\.scss$/, loader: ExtractTextPlugin.extract('css!postcss!sass')}
    ]
  };

  config.plugins.push(
    new WebpackMd5Hash(),
    new ExtractTextPlugin('styles.[contenthash].css'),
    new UglifyJsPlugin({
      comments: false,
      compress: {
        dead_code: true, // eslint-disable-line camelcase
        screw_ie8: true, // eslint-disable-line camelcase
        unused: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true  // eslint-disable-line camelcase
      }
    })
  );
}




//=====================================
//  TEST
//-------------------------------------
if (ENV_TEST) {
  config.devtool = 'inline-source-map';

  config.module = {
    rules: [
      rules.js,
      rules.css,
      rules.fonts,
      rules.images,
      rules.scss,
      rules.json
    ]
  };

  config.externals = {
    'jsdom': 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  };
}