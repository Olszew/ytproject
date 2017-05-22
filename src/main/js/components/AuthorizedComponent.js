import React, { Component } from 'react';
import Logout from './Logout.js';
import CreateAccount from './CreateAccount.js';
import ChannelStore from '../stores/ChannelStore.js';
import * as ChannelActions from '../actions/ChannelActions.js';
import ClientComponent from './ClientComponent.js';





class AuthorizedComponent extends Component {
    constructor(){
        super();

        this.state=this._getChannelState();

    }




    _getChannelState() {
        return {
            channelExist:ChannelStore.getChannelStatus(),
            confirm:ChannelStore.getConfirm()

        };
    }

    onChange() {
        this.setState(this._getChannelState());
    }


    componentDidMount() {

        ChannelStore.on("change", ()=>{
            this.onChange();

        })

    }
    componentWillUnmount(){
        ChannelStore.removeListener("change", ()=>{
            this.onChange();
        })
    }




    render() {



        return (
            <section>



                {this.state.confirm &&undefined != this.state.channelExist&&<div>  {   this.state.channelExist
                    ? <ClientComponent/>: <CreateAccount/>
                }

                </div>}




<Logout/>
            </section>

        );
    }
}

export default AuthorizedComponent;
