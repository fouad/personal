var app = module.exports = require('koa')();
var path = require('path');

var serve;

if (app.env === "usp") {
  console.log('usp');
  serve = require('koa-static-cache');
} else {
  console.log('dev')
  serve = require('koa-static');
}

// logger

app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

// static pages

app.use(serve(path.join(__dirname, '../pages'), {
  buffer: true,
  alias: {
    '/': '/index.html',
  }
}));

// static assets

app.use(serve(path.join(__dirname, '../public'), {
  maxAge: 365 * 24 * 60 * 60,
  buffer: true
}));

// fallback

app.use(function *(next) {
  // outdated blog links
  if (this.request.path.indexOf('blog') > 0 || this.request.path.indexOf('posts') > 0) {
    return this.redirect('https://medium.com/@heyfouad');
  }

  next();
});

app.listen(3000);