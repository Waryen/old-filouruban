import React from 'react'
import AdminCreate from './admin-create'
import AdminList from './admin-list'

export default function Admin(props) {
    return(
        <div>
            <h2>Administrateurs</h2>
            <AdminCreate url={props.url} api={props.api} />
            <AdminList url={props.url} api={props.api} auth={props.auth} />
        </div>
    )
}