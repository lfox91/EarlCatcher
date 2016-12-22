import React from 'react';

export default class Graph extends React.Component{
  render(){
    console.log("Graph: \n", this.props)
    return(
      <div style={{border: '1px solid black', height: '100px', width:'100%'}}>This is graph content</div>
    );
  }
}
