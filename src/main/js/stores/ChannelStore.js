import { EventEmitter } from "events";

import dispatcher from "../dispatcher";



class ChannelStore extends EventEmitter {

    constructor() {
        super();
        this.channelStatus;
        this.confirm=false;
        this.playlists;

    }


    setPlaylist(playlists){
        this.playlists=playlists;
    }

    getPlaylists(){
        return this.playlists;
    }

    setChannelStatus(channelExist){
        this.channelStatus=channelExist;
    }

    getChannelStatus(){
        return this.channelStatus;
    }


    setConfirm(confirm){
        this.confirm=confirm;
    }

    getConfirm(confirm){
        return this.confirm;
    }

    handleActions(action){
        switch(action.type) {

            case "ChannelExisting": {
                this.setChannelStatus(action.json.channelExisting);
                this.emit("change");
                break;
            }
            case "ConfirmChannel":{

                this.setConfirm(true);
                this.emit("change");


                break;
            }
            case "ChannelPlaylists":{
                this.setPlaylist(action.json);
                this.emit("change");

                break;
            }

        }

    }

}


const channelStore = new ChannelStore;
dispatcher.register(channelStore.handleActions.bind(channelStore));
export default channelStore;