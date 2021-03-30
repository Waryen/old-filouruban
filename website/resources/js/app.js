require('./bootstrap');
import React from 'react'
import ReactDOM from 'react-dom'

// Importation descomposants
import AdminList from './components/adminList'
import AdminCreate from './components/adminCreate'
import AdminLogin from './components/adminLogin'

// CONST
const url = `${document.querySelector('#url').getAttribute('content')}:8000`
const api = '8jgVaApBctjy3LgOnlxrG8Yjlnk6yvKPA4on5VkW8gyzzjdjmaedIN3hOHha5UMRqwo7NvdXr1TpFKsLXyEkVPLk5ylZfv4ZyvUE'




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