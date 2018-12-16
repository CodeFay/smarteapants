var webpack = require("webpack");

const define = {
  "global.GENTLY": false
}

if (process.env.NODE_ENV === 'development') {
  const FAUNA_KEY = require("./.env.development.json").FAUNA_KEY
  define['process.env.FAUNA_KEY'] = JSON.stringify(FAUNA_KEY)
}
/* fix for https://medium.com/@danbruder/typeerror-require-is-not-a-function-webpack-faunadb-6e785858d23b */
module.exports = {
  plugins: [
    new webpack.DefinePlugin(define)
  ],
  node: {
    __dirname: true,
  }
}