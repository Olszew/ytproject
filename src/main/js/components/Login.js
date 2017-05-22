import React, { Component } from 'react';
import * as LoginActions from '../actions/LoginActions.js';



function responseSuccess(){
    LoginActions.GoogleClik();
}

 class Login extends Component {

     constructor(){
         super();
     }




    responseError(){
         console.log('error')
    }



    render() {
        return (
          <div className="container">
              <div className="col-xs-6 col-xs-offset-3 col-6 col-offset-3 col-md-4 col-md-offset-4 col-lg-4 col-lg-offset-4 col-xl-4 col-xl-offset-4">
                  <button  className="btn-lg btn-block btn-primary" id="google-login" onClick={responseSuccess}>Login</button>
              </div>
          </div>
        );
    }
}

export default Login;
