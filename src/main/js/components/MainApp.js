import React, { Component } from 'react';
import Login from './Login.js';
import AuthorizedComponent from './AuthorizedComponent.js';

import LoginStore from '../stores/LoginStore.js';




class MainApp extends Component {

    constructor() {
        super();
        this.state = this._getLoginState();


    }

    _getLoginState() {
        return {
            loginStatus:LoginStore.getLoginStatus(),
            confirm:LoginStore.getConfirm()
        };
    }

    _onChange() {
        this.setState(this._getLoginState());
    }


    componentDidMount(){

    LoginStore.on("change", ()=>{
        this._onChange();

    })

    }

    componentWillUnmount(){
        LoginStore.removeListener("change", ()=>{
            this._onChange();
    })
    }



    render () {
        return (
            <div>

                {this.state.confirm &&<div> {
                    this.state.loginStatus
                        ? <div><AuthorizedComponent/></div>
                        : <Login/>
                }

                </div>}


            </div>
        );
    }

}


export default MainApp;
