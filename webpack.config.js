const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/pixi-tweener.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'pixi-tweener.js',
    library: 'pixiTweener',
    libraryTarget: 'umd'
  },
  plugins: [new CleanWebpackPlugin()],
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  },
  devtool: "source-map"
};
