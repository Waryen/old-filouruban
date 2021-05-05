import React from 'react'
import ContactList from './contact-list'

export default function Contact(props) {
    return(
        <div className="admin-contact">
            <h2>Contact</h2>
            <ContactList url={props.url} api={props.api} />
        </div>
    )
}