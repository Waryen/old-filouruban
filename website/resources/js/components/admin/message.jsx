import React from 'react'
import MessageCreate from './message-create'
import MessageList from './message-list'

export default function Message(props) {
    return(
        <div className="admin-message">
            <h2>Messages</h2>
            <MessageCreate url={props.url} api={props.api} auth={props.auth} />
            <MessageList url={props.url} api={props.api} auth={props.auth} />
        </div>
    )
}