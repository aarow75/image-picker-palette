const path = require('path');
const HTMLPage = require('html-webpack-plugin');

module.exports = {
  devServer: {
    open: false,
    port: 3030,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          extends: path.resolve(__dirname, '.babelrc'),
          presets: []
        },
      },
      {
        test: /vendor\/\.js$/,
        exclude: /node_modules/,
        use: ['script-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ],
  },
  plugins: [new HTMLPage()],
  resolve: {
    extensions: [".js", ".jsx", ".json", ".css"]
  }
}
