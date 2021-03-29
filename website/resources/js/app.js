require('./bootstrap');
import React from 'react'
import ReactDOM from 'react-dom'

// Importation descomposants
import AdminList from './components/adminList'
import AdminCreate from './components/adminCreate'

// CONST
const url = `${document.querySelector('#url').getAttribute('content')}:8000`
const api = 'E2Vm97Q5MSV9AJgxugS4I2Ibo6iBZJNxuu7Z6Lpc4XBTz73kqYXgNUOlH65xLLZJKMSx4tgdNeYTPRg0gzNXuaEDeG6XbXSJxk9W'




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