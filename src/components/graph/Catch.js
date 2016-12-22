import React from 'react';
import NavLink from '../NavLink';
import { browserHistory } from 'react-router';
import request from 'request';

export default class Catch extends React.Component{

  componentDidMount() {
     //Asynchronous ish!
    console.log("In cdm of Catch");
    var postInputUrl = new XMLHttpRequest();
    console.log(JSON.stringify(postInputUrl, null, 2));
    postInputUrl.onerror = function(err){ console.log(err);}
    postInputUrl.onloadend = this.handlePostRes(postInputUrl);
    postInputUrl.open("POST", "/catch", true);
    postInputUrl.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    postInputUrl.send("url="+this.props.url);

    let now = new Date();
    console.log(`Home updated @ ${now.toUTCString()}`);

  }
  handlePostRes(postInputUrl){
    //Call a function when the state changes.
    console.log("handlePostRes is running", postInputUrl.readyState);
    if(postInputUrl.status == 200) {
        // Request finished. Do processing here.
        console.log("Post Response Successful", postInputUrl.response);
        browserHistory.push('graph');
    }

  }
  cleanURL(urlStr){
    return urlStr;
  }
  render(){

    return(
      <div>
        <p>Generating your graph...</p>
        <p><em>This may take a while</em></p>
        State.URL: { this.cleanURL(this.props.url) }

      </div>
    );
  }
}
