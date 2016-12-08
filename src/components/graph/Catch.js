import React from 'react';
import Link from 'react-router';

export default class Catch extends React.Component{
  render(){
    return(
      <div>
        <Link {...this.props} activeClassName="active">Catch It</Link>
      </div>
    );
  }
}
