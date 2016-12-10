import React from 'react';

export default class Graph extends React.Component{
  constructor(props){
    super(props);

    this.props = props
  }
  render(){
    console.log(props)
    return(
      <div style={{border: '1px', height: '100px', width:'100%'}}>This is graph content</div>
    );
  }
}
