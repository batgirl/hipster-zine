var express = require('express');
var router = express.Router();
var db = require('../app.js');
var Articles = db.get('articles');

/* GET home page. */
router.get('/', function(req, res, next) {
  Articles.find({}, function(err, articles) {
    if (err) return err;
    res.render('index', { articles: articles });
  });
});

router.get('/new', function(req, res, next) {
  res.render('new', {});
});

router.post('/', function(req, res, next) {
  Articles.insert({title: req.body.article_title, background: req.body.background_url, dark: req.body.dark_background, excerpt: req.body.excerpt, body: req.body.body}, function(err, articles) {
    if (err) return err;
    res.redirect('/');
  });
});

router.get('/:id', function(req, res, next) {
  Articles.findOne({_id: req.params.id}, function(err, article) {
    if (err) return err;
    res.render('show', {article: article});
  })
});

router.get('/:id/edit', function(req, res, next) {
  Articles.findOne({_id: req.params.id}, function(err, article) {
    if (err) return err;
    res.render('edit', {article: article});
  })
});

router.post('/:id', function(req, res, next) {
  Articles.findAndModify({_id: req.params.id}, {title: req.body.article_title, background: req.body.background_url, dark: req.body.dark_background, excerpt: req.body.excerpt, body: req.body.body}, {new: true}, function(err, newArticle) {
    if (err) return err;
    res.render('show', {article: newArticle});
  })
});

router.post('/:id/delete', function(req, res, next) {
  Articles.remove({_id: req.params.id});
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  res.redirect('/');
});

module.exports = router;
