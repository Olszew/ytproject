import React, { Component } from 'react';

class Header extends Component {
    constructor(){
        super();
    }

    render() {
        return (
            <section id="Header">
                <div className="container text-center">
                    <h1>YouTube Playlists</h1>
                    <p>Create your playlist</p>
                </div>
            </section>
        );
    }
}

export default Header;
