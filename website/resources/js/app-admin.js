require('./bootstrap');
import React from 'react'
import ReactDOM, { render } from 'react-dom'
import {HashRouter as Router, Route} from 'react-router-dom'

// Importation des composants
import Navigation from './components/admin/admin-navigation'
import Dashboard from './components/admin/dashboard'
import Admin from './components/admin/admin'
import Article from './components/admin/article'
import Categorie from './components/admin/categorie'
import Commentaire from './components/admin/commentaire'
import Message from './components/admin/message'
import Contact from './components/admin/contact'
import AdminLogin from './components/admin/admin-login'
import AdminLogout from './components/admin/admin-logout'
import Subscriber from './components/admin/subscriber.jsx'

// CONST
const url = `${document.querySelector('#url').getAttribute('content')}`
let api
let auth

if(document.querySelector('#auth')) {
    const prepareAuth = document.querySelector('#auth').getAttribute('content')
    if(prepareAuth) {
        auth = prepareAuth
        let parsedAuth = JSON.parse(prepareAuth)
        api = parsedAuth.api_token
    }
}



export default function App() {
    return(
        <div className="react-app">
            <Router>
                <Navigation></Navigation>

                <Route path="/" exact render={props => <Dashboard url={url} api={api} />} />
                <Route path="/admin" exact render={props => <Admin url={url} api={api} auth={auth} />} />
                <Route path="/article" exact render={props => <Article url={url} api={api} auth={auth} />} />
                <Route path="/categorie" exact render={props => <Categorie url={url} api={api} />} />
                <Route path="/commentaire" exact render={props => <Commentaire url={url} api={api} />} />
                <Route path="/message" exact render={props => <Message url={url} api={api} auth={auth} />} />
                <Route path="/contact" exact render={props => <Contact url={url} api={api} />} />
                <Route path="/subscriber" exact render={props => <Subscriber url={url} api={api} />} />
            </Router>
        </div>
    )
}



// Rendu des composants

if(document.getElementById('react-admin')) {
    ReactDOM.render(
        <App />,
        document.getElementById('react-admin')
    )
}

if(document.getElementById('react-login')) {
    ReactDOM.render(
        <AdminLogin url={url}></AdminLogin>,
        document.getElementById('react-login')
    )
}

if(document.getElementById('react-logout')) {
    ReactDOM.render(
        <AdminLogout auth={auth}></AdminLogout>,
        document.getElementById('react-logout')
    )
}