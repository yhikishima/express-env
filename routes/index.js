
/*
 * GET home page.
 */
// var express = require('express');
// var json = require('./data/pageList.json');

exports.index = function(req, res){
  res.render(json.index.file, { title: 'index',name: 'hoge' });

};

exports.page2 = function(req, res){
  res.render('page2.hbs', { title: 'page2',name: 'hoge' });
};

exports.hoge = function(req, res){
  res.render('hoge/hoge.hbs', { title: 'hoge/index.hbs',name: 'hogehoge' });
};

