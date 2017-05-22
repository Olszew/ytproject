import React, { Component } from 'react';
import * as LoginActions from '../actions/LoginActions.js';


function responseSuccess(){
    LoginActions.logout();
}

 class Logout extends Component {


     constructor(){
         super();
     }



     responeSuccess(){
         LoginActions.logout();
     }

    render() {
        return (
            <div className="container">
                <div className="col-xs-6 col-xs-offset-3 col-6 col-offset-3 col-md-4 col-md-offset-4 col-lg-4 col-lg-offset-4 col-xl-4 col-xl-offset-4">
                    <button id="google-logout" className="btn-lg btn-block btn-primary" onClick={responseSuccess}>Log out</button>
                </div>
            </div>
        );
    }
}

export default Logout;
