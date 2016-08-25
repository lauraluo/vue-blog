// module.exports = {
//     // configure a built-in compiler
//     sass: {
//         includePaths: []
//     },
//     // provide your own postcss plugins
//     postcss: [],
//     // configure autoprefixer
//     autoprefixer: {
//         browsers: ['last 2 versions']
//     },
//     // configure html minification in production mode
//     // see https://github.com/kangax/html-minifier#options-quick-reference
//     htmlMinifier: {
//         // ...
//     },
//     // register custom compilers
//     customCompilers: {
//         // for tags with lang="ts"
//         ts: function(content, cb, compiler, filePath) {
//             // content:  content extracted from lang="ts" blocks
//             // cb:       the callback to call when you're done compiling
//             // compiler: the vueify compiler instance
//             // filePath: the path for the file being compiled
//             //
//             // compile some TypeScript... and when you're done:
//             cb(null, result)
//         }
//     }
// }


// vue.config.js
module.exports = {
  babel: {
    // enable stage-0 features, make sure to install
    // babel-presets-stage-0
    presets: ['es2015']
    plugins: ['transform-runtime']
  }

  