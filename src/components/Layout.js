import React from 'react';
import { Link } from 'react-router';

export default class Layout extends React.Component {
  render(){
    return (
      <div className="app-containter">
        This is App Container
        <header>
          <Link to="/">Earl Catcher</Link>
        </header>
        <div className="app-content">{this.props.children}</div>
        <footer>
          <small>copyright 2016 | By Leaf</small>
        </footer>
      </div>
    );
  }
}
