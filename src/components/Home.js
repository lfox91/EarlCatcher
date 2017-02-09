import React from 'react';
import NavLink from './NavLink';
import { browserHistory } from 'react-router';

export default class Home extends React.Component {

  constructor(props){
    super(props);
  }
  immitateLinkAction(e){
    e.preventDefault();
    browserHistory.push('catch');
  }

  render(){
    return(
      <div>
        <form onSubmit={this.immitateLinkAction.bind(this)} autoComplete>
          <input onChange={this.props.updateURL} type="text" />
          <br/>
          <label>Enter your URL</label>
        </form>
        <div>
          <NavLink onClick={this.props.onCatch} to="catch">Catch Earl!!!</NavLink>
        </div>
      </div>
    );
  }
}
