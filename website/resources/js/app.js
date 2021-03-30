require('./bootstrap');
import React from 'react'
import ReactDOM from 'react-dom'

// Importation descomposants
import AdminList from './components/adminList'
import AdminCreate from './components/adminCreate'
import AdminLogin from './components/adminLogin'
import AdminLogout from './components/adminLogout'

// CONST
const url = `${document.querySelector('#url').getAttribute('content')}`
const api = '8jgVaApBctjy3LgOnlxrG8Yjlnk6yvKPA4on5VkW8gyzzjdjmaedIN3hOHha5UMRqwo7NvdXr1TpFKsLXyEkVPLk5ylZfv4ZyvUE'
let auth
if(document.querySelector('#auth')) {
    const prepareAuth = document.querySelector('#auth').getAttribute('content')
    if(prepareAuth) {
        auth = prepareAuth
    }
}




// Rendu des composants

if(document.getElementById('react-admin-list')) {
    ReactDOM.render(
        <AdminList url={url} api={api}></AdminList>,
        document.getElementById('react-admin-list')
    )
}

if(document.getElementById('react-admin-create')) {
    ReactDOM.render(
        <AdminCreate url={url} api={api}></AdminCreate>,
        document.getElementById('react-admin-create')
    )
}

if(document.getElementById('react-login')) {
    ReactDOM.render(
        <AdminLogin url={url}></AdminLogin>,
        document.getElementById('react-login')
    )
}

if(auth) {
    if(document.getElementById('react-logout')) {
        ReactDOM.render(
            <AdminLogout auth={auth}></AdminLogout>,
            document.getElementById('react-logout')
        )
    }
}