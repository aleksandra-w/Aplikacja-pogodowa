const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const path = require("path");


module.exports = {
  output: {
    path: path.resolve(__dirname, 'docs'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {loader: "babel-loader"},
          {
            loader: 'string-replace-loader',
            options: {
              search: '..\/src\/icons',
              replace: 'src/icons',
              flags: 'g'
            }
          }
      ]
      },
      {
        test: /\.html$/,
        use: 
          {
            loader: "html-loader",
            options: { minimize: true }
          }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: "file-loader?name=[name].[ext]&outputPath=./src/icons/"
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
     }),
     new CopyPlugin([{ 
       from: 'src/icons', 
       to: 'src/icons', 
       force: true 
      },
    ]),
  ]
};
