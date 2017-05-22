import React, { Component } from 'react';
import ChannelStore from '../stores/ChannelStore.js';



class PlaylistsComponent extends Component {
    constructor(){
        super();
        this.playlists=this._getPlaylistsState();
    }

    _getPlaylistsState() {
        return {
            channelExist:ChannelStore.getPlaylists()


        };
    }

    render() {
        return (
            <section id="Playlists">
                <div className="container">
                    <h3>Playlists</h3>
                </div>

            </section>
        );
    }
}

export default PlaylistsComponent;
