import React from 'react'
import ArticleCreate from './article-create'
import ArticleList from './article-list'

export default function Article(props) {
    return(
        <div>
            <h1>Articles</h1>
            <ArticleCreate url={props.url} api={props.api} auth={props.auth} />
            <ArticleList url={props.url} api={props.api} />
        </div>
    )
}