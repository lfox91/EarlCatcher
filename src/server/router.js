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
import Url from './models/URL';

const router = express.Router();

router.post('/catch', function(req, res)  {

  console.log("hello??");
  res.send([{href:'www.google.com', text:"Google"}, {href:'www.foogle.com', text:"Foogle"}]);
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
        console.log(renderProps.location.pathname);
        console.log(RouterContext);
        if(renderProps.location.pathname == 'catch'){
          console.log("CAUGHT ----------------------------------------------", JSON.stringify(renderProps, null, 2))
        } else {
          console.log("\n\n**************************************\n %s \n******************************************\n\n", JSON.stringify(renderProps, null, 1));
        }
        markup = renderToString(<RouterContext {...renderProps}/>);
      } else {
        // otherwise we can render a 404 page
        markup = renderToString(<NotFoundPage/>);
        res.status(404);
      }

      // render the index template with the embedded React markup
      return res.render('index', { markup });
    }
  );
});

module.exports = router;
