import React from 'react';
import NavLink from '../NavLink';
import { browserHistory } from 'react-router';
import request from 'request';

export default class Catch extends React.Component{

   componentDidMount() {
     //Asynchronous ish!
    let postInputUrl = new XMLHttpRequest();
    postInputUrl.open("POST", "/catch");
    postInputUrl.send(this.props.url);
    postInputUrl.onreadystatechange = this.handlePostRes(postInputUrl)
     console.log(`Home updated @ ${Date.now().toString()}`);

  }
  handlePostRes(postInputUrl){
    //Call a function when the state changes.
    if(postInputUrl.readyState == XMLHttpRequest.DONE && postInputUrl.status == 200) {
        // Request finished. Do processing here.
        console.log("Post Response Successful", postInputUrl.response);
        browserHistory.push('graph');
    }

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
