import React from 'react';
import { Link } from 'react-router';
import NavLink from './NavLink';

export default class Layout extends React.Component {
  constructor(){
    super();
    this.state = {url:""}
  }
  render(){
    console.log("Layout", this.props.children);
    return (
      <div className="app-containter">
        <header>
            <h1>Earl Catcher</h1>
            <NavLink to={{pathname:"/", state: this.state.url}} onlyActiveOnIndex={true}>Home</NavLink>
        </header>
        <hr/>
        <div className="app-content">
          {this.props.children}
        </div>
        <footer>
          <small>copyright &copy; 2016 | By Leaf</small>
        </footer>
      </div>
    );
  }
}
