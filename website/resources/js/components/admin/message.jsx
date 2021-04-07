import React from 'react'
import MessageCreate from './message-create'
import MessageList from './message-list'

export default function Message(props) {
    return(
        <div>
            <h1>Messages</h1>
            <MessageCreate url={props.url} api={props.api} auth={props.auth} />
            <MessageList url={props.url} api={props.api} />
        </div>
    )
}