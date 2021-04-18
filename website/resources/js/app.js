require('./bootstrap');
require('./menu')
import React from 'react'
import ReactDOM from 'react-dom'

// Importation des composants
import ArticleList from './components/public/article-list'
import Newsletter from './components/public/newsletter'
import Search from './components/public/search'
import Contact from './components/public/contact'
import CategoriesList from './components/public/cat-list'

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

if(document.getElementById('react-newsletter')) {
    ReactDOM.render(
        <Newsletter url={url} api={api}></Newsletter>,
        document.getElementById('react-newsletter')
    )
}

if(document.getElementById('react-search')) {
    ReactDOM.render(
        <Search url={url}></Search>,
        document.getElementById('react-search')
    )
}

if(document.getElementById('react-contact')) {
    ReactDOM.render(
        <Contact url={url} api={api} />,
        document.getElementById('react-contact')
    )
}

if(document.getElementById('react-categories')) {
    ReactDOM.render(
        <CategoriesList url={url} api={api} />,
        document.getElementById('react-categories')
    )
}