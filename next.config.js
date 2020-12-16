const withSass = require('@zeit/next-sass');
const withImages = require('next-images');

module.exports = withSass(withImages({
  devIndicators: {
    autoPrerender: false
  },
  module: {
    rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          resolve: {
            extensions: [".js", ".jsx"]
          },
          use: {
            loader: "babel-loader"
          }
        },
        {
            test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2)$/i,
            use: [
                {
                    loader: 'file-loader'
                }
            ]
        }

        
    ]
  } 
}));