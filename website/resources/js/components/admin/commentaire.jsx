import React from 'react'
import CommentaryList from './commentaire-list'

export default function Commentaire(props) {
    return(
        <div>
            <h1>Commentaires</h1>
            <CommentaryList url={props.url} api={props.api} />
        </div>
    )
}