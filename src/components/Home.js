import React from 'react';
import NavLink from './NavLink';

export default class Home extends React.Component {

  getValue () => {
    let input = document.getElementByTagName('input')[0]
    this.props.value = input.value
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
        <div><NavLink to="/catch">Catch Earl!!!</NavLink></div>
      </div>
    );
  }
}
