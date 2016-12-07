import React from 'react'
import { Route, indexRoute } from 'react-router'
import Layout from './components/Layout'
import Index from './components/Index'
import Graph from './components/Graph'
import Oops from './components/404'

const routes = (
  <Route path="/" component={Layout}>
    <Index component={Index}/>
    <Route path="" component={Graph}/>
    <Route path="*" component={Oops}/>
  </Route>
)

export default routes;
