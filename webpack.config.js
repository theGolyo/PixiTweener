const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/pixi-tweener.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'pixi-tweener.js',
    library: 'pixiTweener',
    libraryTarget: 'umd'
  },
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
