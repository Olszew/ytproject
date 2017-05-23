import dispatcher from "../dispatcher";
import fetch from 'node-fetch';
import LoginStore from '../stores/LoginStore.js';




export function checkChannelExisting() {
    var initModel={
        accessToken:LoginStore.getAccessToken()
    }
    fetch('http://localhost:8080/YTcreator/start', { method: 'POST', body:  JSON.stringify(initModel), headers: { 'Content-Type': 'application/json' } })
        .then(res => res.json())
        .then(json => dispatcher.dispatch({
            type: "ChannelExisting",
            json


        }) ).then(confirm());

    return
}

export function Playlists(json) {
    if(json.channelExisting==true){
        getCreatedPlaylists();
    }
}

export function getCreatedPlaylists() {
    var initModel={
        accessToken:LoginStore.getAccessToken()
    }
    fetch('http://localhost:8080/YTcreator/start2', { method: 'POST', body:  JSON.stringify(initModel), headers: { 'Content-Type': 'application/json' } })
        .then(res => res.json())
        .then(json => dispatcher.dispatch({
            type: "ChannelPlaylists",
            json


        }) );

}

export function createPlaylist(data) {
    console.log('createPlaylist');
    var searchModel={
        query:data.query,
        duration:data.duration,
        category:data.category,
        accessToken:LoginStore.getAccessToken()
    }
    fetch('http://localhost:8080/YTcreator/api3',{ method: 'POST', body:  JSON.stringify(searchModel), headers: { 'Content-Type': 'application/json' } })
        .then(res => res.json())
        .then(
console.log('gulp')
        ) ;
}

export function confirm() {
    dispatcher.dispatch({
        type: "ConfirmChannel",

    });
}
