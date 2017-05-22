import { EventEmitter } from "events";

import dispatcher from "../dispatcher";



class LoginStore extends EventEmitter {

    constructor() {
        super();

        this.loginStatus;
        this.confirm=false;
        this.accessToken;

    }

    setLoginStatus(isLogged){
        this.loginStatus=isLogged;
        console.log(this.getLoginStatus());
    }

   getLoginStatus(){
        return this.loginStatus;
   }

   setConfirm(confirm){
        this.confirm=confirm;
   }

   getConfirm(confirm){
       return this.confirm;
   }

   setAccessToken(accessToken){
       this.accessToken=accessToken;
   }
   getAccessToken(){
       return this.accessToken;
   }



handleActions(action){
    switch(action.type) {
        case "Login": {
            this.setLoginStatus(true);
            //this.setGoogleUser(action.googleUser)
            this.emit("change");
            break;
        }
        case "Logout": {
             this.setLoginStatus(false);
            this.emit("change");
            break;
        }
        case "ConfirmLogin":{
            this.setConfirm(true);
            this.emit("change");
            break;
        }

        case "accessToken":{
            this.setAccessToken(action.accessToken);
            this.emit("change");
            break;
        }
    }
}

}

const loginStore = new LoginStore;
dispatcher.register(loginStore.handleActions.bind(loginStore));
export default loginStore;
