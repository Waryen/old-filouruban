import React from 'react'
import ArticleCreate from './article-create'
import ArticleList from './article-list'

export default function Article(props) {
    return(
        <div className="admin-articles">
            <h2>Articles</h2>
            <ArticleCreate url={props.url} api={props.api} auth={props.auth} />
            <ArticleList url={props.url} api={props.api} />
        </div>
    )
}