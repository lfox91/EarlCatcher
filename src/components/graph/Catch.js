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
    this.getProm = [];
  }
  componentDidMount() {
    //Asynchronous code!
    //After component is written to DOM post url to our server


  }
   recursiveGet(url){
    let seaver = "http://seaver.pepperdine.edu"
    let that = this;
    var url = this.cleanURL(this.props.url)//make this happen sooner
    while(!allLinks.url){
      request.post('http://localhost:3000/catch', {form: {url:url}},
        function (err, res, body){
          if(err)console.log(err);
          // If there is no error we change our location to /graph
          else{
            body = JSON.parse(body);

            that.links = body.links;
            that.links = body.links.map((linkObj, i) => {
              if (linkObj.href[0]=='/'){
                 linkObj.href = seaver + linkObj.href;
              }

              return(
                <li key={i.toString()}>
                  <a href={linkObj.href}>{linkObj.text}</a>
                  {/*onclick modal of page with notes beside it*/}
                </li>
              )
            });
            this.setState({
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
          Possible Earl Catcher game while loading
         */}
        <p>Generating your graph...</p>
        <p><em>This may take a while</em></p>
        Generating Graph for { this.cleanURL(this.props.url) }

      </div>
    );
  }
  graph(){
    console.log(this.links)
    return(
      <div style={{border: '1px solid orange', width:'100%', color:'rgb(17, 40, 55)'}}>
        <h2>This is graph content</h2>
        <ul>{this.links}</ul>
      </div>
    )
  }
  componentWillUpdate(nextProps, nextState) {
    if(!this.props.postedUrl){
      this.update = this.waitingMessage();
    } else {
      this.update = this.graph();
    }
  }
  cleanURL(urlStr){
    //this function will make sure url is cleanURL
    // TODO: make this func

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
