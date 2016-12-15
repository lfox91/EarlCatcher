import React from 'react';
import NavLink from './NavLink';

export default class Home extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    console.log(this.getValue+"\n", "URL|TPU"+this.url+'\n', this.updateURL);
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
