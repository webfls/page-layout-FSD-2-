const path = require('path')

const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//BundleAnalyzerPlugin - Analise weight of libraries
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//   .BundleAnalyzerPlugin
const TerserPlugin = require('terser-webpack-plugin')

const srcVar = path.resolve(__dirname, 'src')
const distVar = path.resolve(__dirname, 'dist')

const isDev = process.env.NODE_ENV === 'development'

const filename = (ext) => {
  let filenameExt
  if (isDev) {
    if ((ext === 'js') | (ext === 'css')) {
      filenameExt = `${ext}/[name].${ext}`
    } else {
      filenameExt = `[name].${ext}`
    }
  }
  if (!isDev) {
    if ((ext === 'js') | (ext === 'css')) {
      filenameExt = `${ext}/[name].[contenthash].${ext}`
    } else {
      filenameExt = `[name].[contenthash].${ext}`
    }
  }
  return filenameExt
}

const devServer = () => {
  let devOptions = {}

  if (isDev) {
    devOptions = {
      historyApiFallback: true,
      contentBase: path.join(__dirname, 'dist'),
      publicPath: '/',
      open: true,
      compress: true,
      hot: true,
      port: 3000,
      index: 'color-type-page.html',
    }
  }
  return devOptions
}

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  }

  if (!isDev) {
    config.minimizer = [
      new TerserPlugin({
        parallel: true,
      }),
    ]
  }
  return config
}

const allPlugins = () => {
  const plugins = [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          //TODO: change directory
          from: srcVar + '/pages/color-type-page/img',
          to: distVar + '/img',
        },
      ],
    }),
    new HtmlWebpackPlugin({
      //TODO: change directory
      favicon: srcVar + '/pages/color-type-page/favicon.ico',
      template: srcVar + '/pages/color-type-page/color-type-page.pug',
      filename: 'color-type-page.html',
      inject: true,
    }),
    new MiniCssExtractPlugin({
      filename: filename('css'),
      chunkFilename: '[id].css',
    }),
  ]

  if (isDev) {
    plugins.push(new webpack.HotModuleReplacementPlugin())
  }
  // else {
  //   plugins.push(new BundleAnalyzerPlugin())
  // }
  return plugins
}

const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-proposal-class-properties'],
      },
    },
  ]
  if (isDev) {
    loaders.push('eslint-loader')
  }
  return loaders
}

module.exports = {
  resolve: {
    alias: {
      '@color-type-page': path.resolve(__dirname, 'src/pages/color-type-page/'),
    },
  },

  mode: !isDev ? 'production' : 'development',
  devtool: !isDev ? false : 'inline-source-map',
  context: srcVar,
  //TODO: change directory
  entry: ['@babel/polyfill', './pages/color-type-page/color-type-page.js'],

  output: {
    path: distVar,
    filename: filename('js'),
    publicPath: './',
  },

  devServer: devServer(),

  optimization: optimization(),
  stats: {
    logging: 'warn',
    builtAt: true,
    assetsSpace: 0,
    modulesSpace: 0,
  },

  plugins: allPlugins(),

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: jsLoaders(),
      },
      {
        test: /\.(sc|sa|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: '../' },
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      },
      {
        test: /\.pug$/,
        include: path.join(__dirname, 'src'),
        use: {
          loader: 'pug-loader',
          options: {
            pretty: true,
          },
        },
      },
    ],
  },
}
