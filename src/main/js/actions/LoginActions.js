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
        'apiKey': 'AIzaSyBWFD_MgrxgF4xglPQ-iaPZ435cv2dbFKw',
        'discoveryDocs': [discoveryUrl],
        'clientId': '1002585333627-3f7cerbaa2msshar7kvqcar36omst236.apps.googleusercontent.com',
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






