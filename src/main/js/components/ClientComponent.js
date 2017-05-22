import React, { Component } from 'react';
import FormComponent from './FormComponent.js';
import PlaylistsComponent from './PlaylistsComponent.js';
import * as ChannelActions from '../actions/ChannelActions.js';


class ClientComponent extends Component {
    constructor(){
        ChannelActions.getCreatedPlaylists();
        super();
    }

    render() {
        return (
            <section id="header">
                <div className="container">
                    <FormComponent/>
                    <h1>Client Component</h1>
                    <PlaylistsComponent/>

                </div>

            </section>
        );
    }
}

export default ClientComponent;
