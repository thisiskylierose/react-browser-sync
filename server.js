var path = require('path')
var express = require('express')
var http = require('http')
var ejs = require('ejs')
var app = express()
var port = 3000

app.engine('html', ejs.renderFile)

app.set('view engine', 'html')
app.set('views', path.join(__dirname, 'www/views'))

app.use('/', express.static(path.join(__dirname, 'www')))
app.use('/data', express.static(path.join(__dirname, 'data')))

if (app.get('env') == 'development') {
  var browserSync = require('browser-sync')
  var config = {
    files: ['www/**/*.{js,css,html}'],
    logLevel: 'debug',
    logSnippet: false,
    reloadDelay: 300,
    reloadOnRestart: true,
  }

  app.use(require('connect-browser-sync')(browserSync(config)))
}

app.get('*', (req, res) => {
  res.render('index')
})

http.createServer(app).listen(port, function() {
  console.log('Listening on port ' + port + '...')
})
