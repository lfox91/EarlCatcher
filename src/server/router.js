import express from 'express';
import React from 'react';
import debug from 'debug';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from '../routes';
import NotFoundPage from '../components/Oops';
import cheerio from 'cheerio';
import request from 'request';
import Url from 'models/URL';
const router = express.Router();

router.post('/catch', function(req, res)  {
  var links = [];


});
router.get('*', (req, res) => {
  debug(process.env.NODE_ENV);
  match(
    { routes, location: req.url },
    (err, redirectLocation, renderProps) => {

      // in case of error display the error message
      if (err) {
        return res.status(500).send(err.message);
      }

      // in case of redirect propagate the redirect to the browser
      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      // generate the React markup for the current route
      let markup;
      if (renderProps) {
        // if the current route matched we have renderProps
        if(renderProps.routes.path == 'caught'){
          console.log(JSON.stringify(renderProps, null, 2))
        }
        console.log("**************************************\n %s ******************************************\n", JSON.stringify(renderProps, null, 2));
        markup = renderToString(<RouterContext {...renderProps}/>);
      } else {
        // otherwise we can render a 404 page
        markup = renderToString(<Oops/>);
        res.status(404);
      }

      // render the index template with the embedded React markup
      return res.render('index', { markup });
    }
  );
});

module.exports = router;
