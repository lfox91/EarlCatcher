import React from 'react';
import NavLink from '../NavLink';

export default class Catch extends React.Component{

  render(){
    console.log(this.props.children)
    return(
      <div>
        <p>Generating your graph...</p>
        <p><em>This may take a while</em></p>
        {this.props.url}
        {/*this.props.children*/}
      </div>
    );
  }
}
