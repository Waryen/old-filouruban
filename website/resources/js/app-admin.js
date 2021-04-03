require('./bootstrap');
import React from 'react'
import ReactDOM from 'react-dom'
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
        <div className="App">
            <Router>
                <Navigation></Navigation>

                <Route path="/" exact component={Dashboard} />
                <Route path="/admin" exact component={Admin} />
                <Route path="/article" exact component={Article} />
                <Route path="/categorie" exact component={Categorie} />
                <Route path="/commentaire" exact component={Commentaire} />
                <Route path="/message" exact component={Message} />
                <Route path="/contact" exact component={Contact} />
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