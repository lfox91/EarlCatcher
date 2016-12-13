import React from 'react';
import NavLink from '../NavLink';

export default class Catch extends React.Component{

  render(){
    console.log("Catch", this.props.location.state)
    return(
      <div>
        <p>Generating your graph...</p>
        <p><em>This may take a while</em></p>
        Location State: {this.props.location.state}
        {/*this.props.params.earl*/}
        {/*this.props.children*/}
      </div>
    );
  }
}
