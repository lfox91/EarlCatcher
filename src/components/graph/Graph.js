import React from 'react';

export default class Graph extends React.Component{
  //Get DOM object from Server to display in return
  //probably needs to go in state
  render(){


    console.log("Graph: \n", this.props)
    return(
      <div style={{border: '1px solid black', height: '100px', width:'100%'}}>This is graph content</div>
    );
  }
}
