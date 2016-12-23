import React from 'react';
import NavLink from '../NavLink';
import { browserHistory } from 'react-router';
import request from 'request';


export default class Catch extends React.Component{

  componentDidMount() {
    //Asynchronous ish!
    request.post('http://localhost:3000/catch', {form: {url:this.props.url}},
      function (err, res, body){
        if(err)console.log(err);
        browserHistory.push('graph')
        console.log('Upload successful!  Server responded with:', body);
    });
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
