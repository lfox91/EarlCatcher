import React from 'react';
import NavLink from './NavLink';

export default class Home extends React.Component {

  // constructor(props){
  //   super(props);
  // }

  render(){
    return(
      <div>
        <form onSubmit={this.props.onCatch}>
          <input onChange={this.props.updateURL} type="text"/>
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
