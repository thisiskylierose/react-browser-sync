module.exports = ({ file, options, env }) => ({
  plugins: {
    autoprefixer: {
      browsers: ['last 2 version', '> 5%', 'IE >= 8']
    },
    cssnano: env === 'production' ? options.cssnano : false
  }
});
