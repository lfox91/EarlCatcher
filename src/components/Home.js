import React from 'react';
import NavLink from './NavLink';

export default class Home extends React.Component {

  constructor(props){
    super(props);
    this.getValue = this.getValue.bind(this);
    this.updateURL = this.updateURL.bind(this);
    // console.log("Home Props\n", this.props, this.props.location.state);
    this.url;
    // this.url = ;
  }
  updateURL(e){
    console.log("In update", e.target, e.target.value)
    this.url = e.target.value;
  }
  getValue (e) {
    this.setState({
      url: e.target.value
    });
  }
  render(){
    // console.log("Home", this.props.url, this.state, this)
    console.log(this.getValue+"\n", "URL"+this.url+'\n', this.updateURL);
    return(
      <div>
        <form>
          <input onChange={this.updateURL} type="text"></input>
          <label>Enter your URL</label>
        </form>
        <div>
          <NavLink onClick={this.getValue} to={{pathname: '/catch', state:this.url}}>Catch Earl!!!</NavLink>
        </div>
      </div>
    );
  }
}
