import React from 'react';
import NavLink from '../NavLink';
import { browserHistory } from 'react-router';
import request from 'request';


export default class Catch extends React.Component{

  componentDidMount() {
    //Asynchronous code!
    //After component is written to DOM post url to our server
    request.post('http://localhost:3000/catch', {form: {url:this.props.url}},
      function (err, res, body){
        if(err)console.log(err);
        // If there is no error we change our location to /graph
        else browserHistory.push('graph')
        console.log('Upload successful!  Server responded with:', body);
    });
  }


  cleanURL(urlStr){
    //this function will make sure url is cleanURL
    // TODO: make this func
    return urlStr;
  }
  render(){

    return(
      <div>
        {/*Should display while waiting for response from server*/}
        <p>Generating your graph...</p>
        <p><em>This may take a while</em></p>
        Generating Graph for { this.cleanURL(this.props.url) }

      </div>
    );
  }
}
