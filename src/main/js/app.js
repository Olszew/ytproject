'use strict';

// tag::vars[]
require('./initClient.js');
const React = require('react');
const ReactDOM = require('react-dom')
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import MainApp from './components/MainApp.js';


import * as LoginActions from './actions/LoginActions.js';



class App extends React.Component {



    constructor() {
        LoginActions.handleClientLoad();
        super();

    }






    render() {
		return (
			<div className="text-center">
				<Header/>
				<MainApp/>
				<Footer/>

			</div>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('react')
)

