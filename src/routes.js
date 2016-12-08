import React from 'react';
import { Route, IndexRoute, browserHistory } from 'react-router';
import Layout from './components/Layout';
import Index from './components/Index';
import Catch from './components/graph/Catch';
import Graph from './components/graph/Graph';
import Oops from './components/404';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={Index}/>
    <Route path="/catch" component={Catch}/>
      <IndexRoute component={Graph}/>
    <Route path="*" component={Oops}/>
  </Route>
);

export default routes;
