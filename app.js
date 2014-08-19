/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var hbs = require('express-hbs');
var app = express();
var json_data = require('./data/data.json');

hbs.express3({

  // OPTIONAL settings
  // blockHelperName: "views/helpers/*.js",
  // contentHelperName: "{String} Override 'contentFor' helper name.",
  defaultLayout: "/views/partials/layout.hbs"
  // extname: "{String} Extension for templates, defaults to `.hbs`",
  // handlebars: "{Module} Use external handlebars instead of express-hbs dependency",
  // i18n: "{Object} i18n object",
  // layoutsDir: "/views/partials/layout.hbs"
  // templateOptions: "{Object} options to pass to template()",
  // beautify: "{Boolean}"
});

// all environments
app.set('port', process.env.PORT || 3000);
// app.set('port', 3002);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
// app.engine('hbs', require('hbs').__express);
app.engine('hbs', hbs.express3({
  partialsDir: __dirname + '/views/partials'
}));
// hbs.registerPartials(__dirname + '/views/partials');

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get("/index.html", function(req, res){
  res.render('index', { title: json_data.index.title, name: json_data.index.name });
});

app.get("/:pageId/index.html", function(req, res){
  res.render(req.params.pageId, { title: json_data[req.params.pageId].title,name: json_data[req.params.pageId].name});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

