import React from 'react'
import CommentaryList from './commentaire-list'

export default function Commentaire(props) {
    return(
        <div className="admin-commentary">
            <h2>Commentaires</h2>
            <CommentaryList url={props.url} api={props.api} />
        </div>
    )
}