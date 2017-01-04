import React from 'react';
import { Link } from 'react-router';
import NavLink from './NavLink';

export default class Layout extends React.Component {
  constructor(props){
    super(props);
    this.updateURL= this.updateURL.bind(this);
    this.onCatch= this.onCatch.bind(this);
    this.state = {url:"",postedURL: false, allLinks: {}}
    this.url;
  }
  updateURL(e){
    this.url = e.target.value ;
  }
  onCatch(){
    this.setState({
      url: this.url
    });
  }

  render(){
    {/*console.log("Layout", this.props.children);*/}
    return (
      <div className="app-containter">
        <header>
            <h1>Earl Catcher</h1>
            <NavLink to="/" onlyActiveOnIndex={true}>Home</NavLink>
        </header>
        <hr/>
        <div className="app-content">
           { React.cloneElement( this.props.children, {updateURL: this.updateURL, onCatch: this.onCatch, url: this.state.url, allLinks: this.state.allLinks}) }
        </div>
        <footer>
          <small>copyright &copy; 2016 | By Leaf</small>
        </footer>
      </div>
    );
  }
}
