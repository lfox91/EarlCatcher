const express = require('express'),
      router  = express.Router(),
      script  = require('../public/javascripts/index'),
      request = require('request'),
      cheerio = require('cheerio');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Earl Catcher', index: script });
});

let skeleton = function(req, res, next) {
  res.render('index', {
    title: 'Earl Catcher',
    earl: req.body.earl,
    index: script
  });
  next();
}

let scrape = function(req, res, next) {
  request(req.body.earl, function(rreq, rres, html){
    var $ = cheerio.load(html);
    var feedback = '';
    try {
      if (!error && response.statusCode == 200) {
        //run main
        feedback += 'collecting links this may take awhile...'
      } else throw exception;
    } catch (e) {
      feedback += 'could not render the Earl you provided please input a different URL.'
    } finally {
      res.render('index', {
        title:'Earl Catcher',
        earl: req.body.earl,
        feedback: feedback,
        index: script
      })
    }
  })
}

router.post('/', skeleton, scrape);

module.exports = router;
