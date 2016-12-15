import React from 'react';
import { Route, IndexRoute, browserHistory } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Catch from './components/graph/Catch';
import Graph from './components/graph/Graph';
import Oops from './components/Oops';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={Home}/>
    <Route path="catch" component={Catch}/>
    {/*<Route path="/catch" component={Graph}/>*/}
    <Route path="graph" component={Graph}/>
    <Route path="*" component={Oops}/>
  </Route>
);

export default routes;
