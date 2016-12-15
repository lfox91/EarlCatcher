import React from 'react';
import NavLink from '../NavLink';
import { browserHistory } from 'react-router';
import request from 'request';

export default class Catch extends React.Component{

  componentDidMount() {
    //Asynchronous ish!
    console.log("I'm in CDM in catch");
    request(this.props.url, function(error,response,body){
      if(!error && response.statusCode == 200){
        console.log(body)
      }
    })
    console.log(`Home updated @ ${Date.now().toString()}`);
    browserHistory.push('graph')
  }
  cleanURL(urlStr){
    return urlStr;
  }
  render(){
    console.log("Catch", this.props.url)
    return(
      <div>
        <p>Generating your graph...</p>
        <p><em>This may take a while</em></p>
        Location State: { this.cleanURL(this.props.url) }

      </div>
    );
  }
}
