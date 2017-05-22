import React, { Component } from 'react';
import Logout from './Logout.js';



class CreateAccount extends Component {
    constructor(){
        super();

    }



    render() {
        return (
           <div className="container">
               <h3>You dont have a YouTube channel</h3>
               <h4>Click on button to create:</h4>
               <div className="col-xs-6 col-xs-offset-3 col-6 col-offset-3 col-md-4 col-md-offset-4 col-lg-4 col-lg-offset-4 col-xl-4 col-xl-offset-4">
                   <button className="btn-lg btn-block btn-primary" onClick={function () {window.open("https://www.youtube.com/create_channel", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=800,left=500,width=400,height=400")}}>Create account</button>
               </div>
           </div>

        );
    }
}

export default CreateAccount
