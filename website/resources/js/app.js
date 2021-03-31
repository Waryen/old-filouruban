require('./bootstrap');
import React from 'react'
import ReactDOM from 'react-dom'

// Importation descomposants
import ArticleList from './components/article-list'
import ArticleCreate from './components/article-create'
import AdminLogin from './components/adminLogin'
import AdminLogout from './components/adminLogout'
import AdminCreate from './components/admin-create'

// CONST
const url = `${document.querySelector('#url').getAttribute('content')}`
const api = 'UJKhBNU2kN5qsdopJKVcm4ZFCurkRRWX7uPFlgehdGd0H8alzdoy6yVf2DUh9sPiYrHztFSUx6oijfWhXw0G4nk40RtKUBrDPOmk'
let auth
if(document.querySelector('#auth')) {
    const prepareAuth = document.querySelector('#auth').getAttribute('content')
    if(prepareAuth) {
        auth = prepareAuth
    }
}




// Rendu des composants

if(document.getElementById('react-article-list')) {
    ReactDOM.render(
        <ArticleList url={url} api={api}></ArticleList>,
        document.getElementById('react-article-list')
    )
}

if(document.getElementById('react-article-create')) {
    ReactDOM.render(
        <ArticleCreate url={url} api={api}></ArticleCreate>,
        document.getElementById('react-article-create')
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

if(document.getElementById('react-admin-create')) {
    ReactDOM.render(
        <AdminCreate url={url} api={api}></AdminCreate>,
        document.getElementById('react-admin-create')
    )
}