import React from 'react';
import NavLink from '../NavLink';
import { browserHistory } from 'react-router';
import request from 'request';


export default class Catch extends React.Component{
  constructor(props){
    super(props);
    this.waitingMessage = this.waitingMessage.bind(this);
    this.graph = this.graph.bind(this);
    this.links;
    this.update;
  }
  componentDidMount() {
    //Asynchronous code!
    //After component is written to DOM post url to our server
    //this.props.onCatch();
    this.postURL(this.props.url);
  }
   postURL(url){
    let seaver = "http://seaver.pepperdine.edu" // TODO remove hardcoding
    let that = this;
    var url = this.cleanURL(this.props.url);//make this happen sooner
    if(!this.props.allLinks.url){
      request.post('http://localhost:3000/catch', {form: {url:url}},
      /*
        body[nodes[{href:"", text:""}, {href:"", text:""},... ], ... ]
       */
         function (err, res, body){
          if(err){
            that.setState({
              postedURL: false
            })
            console.log(err);
          } else { // If there is no error we change our location to /graph
            body = JSON.parse(body);
            console.log(body);
            that.links = body.map((linkObj, i) => {
              if (linkObj.href[0]=='/') linkObj.href = seaver + linkObj.href;
              return(
                <li key={i.toString()}>
                  <a href={linkObj.href}>{linkObj.text}</a>
                  {/*onclick modal of page with notes beside it*/}
                </li>
              )
            });
            that.setState({
              postedURL: true
            });
          }

      });
    }
  }
  waitingMessage(){
    return(
      <div>
        {/*Should display while waiting for response from server
          Possible Earl Catcher game while loading*/}
        <p>Generating your graph...</p>
        <p><em>This may take a while</em></p>
        Generating Graph for <b>{ this.cleanURL(this.props.url) }</b>
      </div>
    );
  }
  graph(){
    console.log(this.links);
    return(
      <div style={{border: '1px solid orange', width:'100%', color:'rgb(17, 40, 55)'}}>
        <h2>This is graph content</h2>
        <ul>{this.links}</ul>
      </div>
    )
  }
  componentWillUpdate(nextProps, nextState) {
    if(nextState.postedURL == false){
      this.update = "There was a real bad error......"
      //this.update = this.waitingMessage(); //??should be an error message??
    } else {
      this.update = this.graph();
    }
  }
  cleanURL(urlStr){
    //TODO this function will make sure url is cleanURL
    return urlStr;
  }
  render(){
    return(
      <div >
        {this.update}
      </div>

    )
  }
}
