import React from 'react';
import { Link } from 'react-router';
import NavLink from './NavLink';

export default class Layout extends React.Component {
  constructor(){
    super();

    this.state = {url:""}
  }
  render(){
    return (
      <div className="app-containter">
        This is App Container
        <header>
            <h1>Earl Catcher</h1>
            <NavLink to="/" onlyActiveOnIndex={true}>EC</NavLink>
        </header>
        <hr/>
        <div className="app-content">{this.props.children}</div>
        <footer>
          <small>copyright 2016 | By Leaf</small>
        </footer>
      </div>
    );
  }
}
