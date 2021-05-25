require('./bootstrap');
require('./menu')
import React from 'react'
import ReactDOM from 'react-dom'

// Importation des composants
import Article from './components/public/article'
import Newsletter from './components/public/newsletter'
import Search from './components/public/search'
import Contact from './components/public/contact'
import CategoriesList from './components/public/cat-list'
import Category from './components/public/category'
import Carousel from './components/public/carousel'
import HomeArticles from './components/public/home-articles'
import SearchResult from './components/public/search-result'
import Message from './components/public/message'
import HomeLastArticle from './components/public/home-last-article'

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

if(document.getElementById('react-category')) {
    ReactDOM.render(
        <Category url={url} api={api} />,
        document.getElementById('react-category')
    )
}

if(document.getElementById('react-article')) {
    ReactDOM.render(
        <Article url={url} api={api} />,
        document.getElementById('react-article')
    )
}

if(document.getElementById('react-carousel')) {
    ReactDOM.render(
        <Carousel url={url} api={api} />,
        document.getElementById('react-carousel')
    )
}

if(document.getElementById('react-home-articles')) {
    ReactDOM.render(
        <HomeArticles url={url} api={api} />,
        document.getElementById('react-home-articles')
    )
}

if(document.getElementById('react-search-result')) {
    ReactDOM.render(
        <SearchResult url={url} api={api} />,
        document.getElementById('react-search-result')
    )
}

if(document.getElementById('react-message')) {
    ReactDOM.render(
        <Message url={url} api={api} />,
        document.getElementById('react-message')
    )
}

if(document.getElementById('react-home-last-article')) {
    ReactDOM.render(
        <HomeLastArticle url={url} api={api} />,
        document.getElementById('react-home-last-article')
    )
}