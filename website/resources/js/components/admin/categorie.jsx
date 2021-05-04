import React from 'react'
import CategoryCreate from './cat-create'
import CategoryList from './cat-list'

export default function Categorie(props) {
    return(
        <div className="admin-category">
            <h2>Catégories</h2>
            <CategoryCreate url={props.url} api={props.api} auth={props.auth} />
            <CategoryList url={props.url} api={props.api} />
        </div>
    )
}