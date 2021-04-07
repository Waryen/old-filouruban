import React from 'react'
import ContactList from './contact-list'

export default function Contact(props) {
    return(
        <div>
            <h1>Contact</h1>
            <ContactList url={props.url} api={props.api} />
        </div>
    )
}