const path = require('path');
const express = require('express');
const http = require('http');
const ejs = require('ejs');

const app = express();
const port = 3000;

app.engine('html', ejs.renderFile);

app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'www/views'));

app.use('/', express.static(path.join(__dirname, 'www')));
app.use('/data', express.static(path.join(__dirname, 'data')));

if (app.get('env') == 'development') {
  const browserSync = require('browser-sync');
  const config = {
    files: ['www/**/*.{js,css,html}'],
    logLevel: 'debug',
    logSnippet: false,
    reloadDelay: 300,
    reloadOnRestart: true
  };

  app.use(require('connect-browser-sync')(browserSync(config)));
}

app.get('*', (req, res) => {
  res.render('index');
});

http.createServer(app).listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
