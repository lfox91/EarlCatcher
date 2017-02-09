import React from 'react';
import Mailto from 'react-mailto';

export default class Oops extends React.Component{
  render(){
    return(
      <div>
        <h1>Uh... oh</h1>
        <p>This is awkward. We're sorry there seems to have been an error. We promise to erradicate all the bugs. <br/> Contact</p>
        <span>
          <Mailto email="lea.fox@pepperdine.edu" obfuscate={true}>
            Lea Fox
          </Mailto>if you need immediate assistance.
        </span>
      </div>
    )
  }
}
