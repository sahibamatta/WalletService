var path = require("path");

var DIST_DIR = path.resolve(__dirname, "dist");
var SRC_DIR = path.resolve(__dirname, "src");
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || '8770';

var config = {
  entry: SRC_DIR + "/app/index.js",
  output: {
    path: DIST_DIR + "/app",
    filename: "bundle.js",
    publicPath: "/app/"
  },

  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react']
        }
      },
      {
        test: /\.html?$/,
        exclude: /node_modules/,
        loader: 'html-loader'
      },
      {
        test: /\.css?$/,
        exclude: /node_modules/,
        loader: 'style-loader'
      },
      {
        test: /\.css?$/,
        exclude: /node_modules/,
        loader: 'css-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack-loader?{gifsicle: {interlaced: true}, optipng: {optimizationLevel: 7}, pngquant:{quality: "65-90", speed: 4}, mozjpeg: {quality: 65}}'
        ]
      } 
    ]
  },
  devServer: {
      contentBase: './src',
      // do not print bundle build stats
      noInfo: true,
      // enable HMR
      hot: true,
      // embed the webpack-dev-server runtime into the bundle
      inline: true,
      // serve index.html in place of 404 responses to allow HTML5 history
      historyApiFallback: true,
      port: PORT,
      host: HOST,
      disableHostCheck: true,
      proxy: [
          
          {
              context: ['/WalletService/**'],
              target: 'http://localhost:8080',
              secure: false,
              changeOrigin: true,
          },
      ],
  },
};

module.exports = config;