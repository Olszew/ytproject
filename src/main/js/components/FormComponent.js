import React, { Component } from 'react';
import * as ChannelActions from '../actions/ChannelActions.js';
import LoginStore from '../stores/LoginStore';
import * as $ from "jquery";




class FormComponent extends Component {
    constructor(){
        super();
        this.state=this.getInit();
        this.onSubmit=this.onSubmit.bind(this);
        this.onError=this.onError.bind(this);
        this.onLoading=this.onLoading.bind(this);
        this.onSuccess=this.onSuccess.bind(this);
    }


    getInit(){
        return{
            query : '',
            duration : 'any',
            category: '',
            loading:false
        }
    }


     onSuccess(){
         this.state.loading=false;




     }

    onLoading() {
         console.log('loading');
        this.state.loading=true;
        this.state = this.getInit;
     }

     onError() {
         this.state.loading=false;


         console.log('error');

}

handleChange(key){
    return function (e) {
        var state = {};
        state[key] = e.target.value;
        this.setState(state);

    }.bind(this);
}


    onSubmit(){


        var SearchData={
            query:this.state.query,
            duration:this.state.duration,
            category:this.state.category,
            accessToken:LoginStore.getAccessToken()
        }

        $.ajax({
            url: "http://localhost:8080/api3",
            beforeSend: this.onLoading,
            type: 'POST',
            contentType: "application/json",
            data: JSON.stringify(SearchData),
            success: this.onSuccess,
            error: this.onError
        })

        return false;


    }

    render() {
        return (
            <section id="header">
                <div className="container">
                    <form className="form-horizontal col-xs-12 col-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3 col-xl-6 col-xl-offset-3"
                          id="MainForm" >
                        <div className="form-group">
                            <label htmlFor="query">Query:</label>
                         <input value={this.state.query} onChange={this.handleChange('query')} className="form-control input-lg" id="query" name="query" type="text"/>
                        </div>
                        <div className="form-group ">
                            <label htmlFor="duration">Dimension:</label>
                             <select value={this.state.duration}   onChange={this.handleChange('duration')} className="form-control input-lg" id="duration">
                                <option value="any" >Any</option>
                                <option value="short">Short</option>
                                <option value="medium">Medium</option>
                                <option value="long">Long</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="categoryId">Category:</label>
                       <select value={this.state.category}  onChange={this.handleChange('category')} className="form-control input-lg" id="categoryId">
                                <option value="" >Any</option>
                                <option value="1">Film and Animation</option>
                                <option value="2">Autos and Vehicles</option>
                                <option value="10">Music</option>
                                <option value="15">Pets and Animals</option>
                                <option value="17">Sports</option>
                                <option value="18">Short movies</option>
                                <option value="19">Travel and Events</option>
                                <option value="20">Gaming</option>
                                <option value="21">Videoblogging</option>
                                <option value="22">People and Blogs</option>
                                <option value="23">Comedy</option>
                                <option value="24">Entertainment</option>
                                <option value="25">News and Politics</option>
                                <option value="26">Howto and Style</option>
                                <option value="27">Education</option>
                                <option value="28">Science and Technology</option>
                                <option value="29">Nonprofits and Activism</option>
                                <option value="30">Movies</option>
                                <option value="31">Anime/Animation</option>
                                <option value="32">Action/Adventure</option>
                                <option value="33">Classics</option>
                                <option value="35">Documenatary</option>
                                <option value="36">Drama</option>
                                <option value="37">Family</option>
                                <option value="38">Foreign</option>
                                <option value="39">Horror</option>
                                <option value="10">Sci-Fi/Fantasy</option>
                                <option value="41">Thriller</option>
                                <option value="42">Shorts</option>
                                <option value="43">Shows</option>
                                <option value="44">Trailers</option>
                            </select>
                        </div>

                    </form>
                    <div className="col-xs-8 col-xs-offset-2 col-6 col-offset-3 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4 col-xl-4 col-xl-offset-4">
                        <div className="text-center">
                        <button className="btn-lg btn-primary col-xs-12 col-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3 col-xl-6 col-xl-offset-3"  onClick={this.onSubmit}> Create playlist</button>

                    </div>
                    </div>
                    {this.state.loading}



                </div>

            </section>
        );
    }
}

export default FormComponent;
