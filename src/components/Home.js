import React from 'react';
import NavLink from './NavLink';

export default class Home extends React.Component {
  // constructor(props){
  //   super(props);
  //   this.state = { url: '' };
  // }
  getValue (e) {
    this.setState({url : e.target.value });
  }
  render(){
    return(
      <div>
        <div id="http">HTTP</div>
        <div id="https">HTTPS</div>
        <form>
          <input type="text"></input>
          <label>Enter your URL</label>
        </form>
        <div>
          <NavLink onClick={this.getValue} to="/catch">Catch Earl!!!</NavLink>
        </div>
      </div>
    );
  }
}
