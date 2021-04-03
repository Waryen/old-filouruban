import React from 'react'
import AdminCreate from './admin-create'

export default function Admin(props) {
    return(
        <div>
            <h2>Administrateurs</h2>
            <AdminCreate url={props.url} api={props.api} />
        </div>
    )
}