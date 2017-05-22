import dispatcher from "../dispatcher";
import * as ChannelActions from './ChannelActions.js';



var GoogleAuth;
var SCOPE = 'https://www.googleapis.com/auth/youtube';



export function handleClientLoad() {

    gapi.load('client:auth2', initClient);
}

  function initClient() {

    var discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest';


    gapi.client.init({
        'apiKey': 'AIzaSyAXG3WlXzaqwRjnEj6OqfTSPIem6MV8X9Y',
        'discoveryDocs': [discoveryUrl],
        'clientId': '85159034377-kohf1ommpuelap4omhvh8pmbe4426j05.apps.googleusercontent.com',
        'scope': SCOPE
    }).then(function () {
        GoogleAuth = gapi.auth2.getAuthInstance();

        updateSigninStatus(GoogleAuth.isSignedIn.get());
        GoogleAuth.isSignedIn.listen(updateSigninStatus);




        dispatcher.dispatch({
            type: "ConfirmLogin",

        })






    });
}

export function login() {
   // GoogleAuth.signIn();
    GoogleCreditionals();

    dispatcher.dispatch({
        type: "Login",

    })
    ChannelActions.checkChannelExisting();




}


export function GoogleCreditionals() {
    var accessToken=GoogleAuth.currentUser.get().getAuthResponse().access_token;
    dispatcher.dispatch({
        type: "accessToken",
        accessToken
    });

}


export function logout() {
   GoogleAuth.disconnect();

    console.log("logoutaction");
    console.log(GoogleAuth.isSignedIn.get());



    dispatcher.dispatch({
        type: "Logout",
    });

}

export function GoogleClik() {
    GoogleAuth.signIn();
    if(GoogleAuth.isSignedIn.get()){
    login();
        }
}

function updateSigninStatus(isSignedIn) {
        if(GoogleAuth.isSignedIn.get()){
            login();



    }else {
            logout();
    }
}


export function revokeAccess() {
    GoogleAuth.disconnect();

}


export function confirm() {
    dispatcher.dispatch({
        type: "Confirm",

    });

}






