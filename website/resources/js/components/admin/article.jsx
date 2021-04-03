import React from 'react'
import ArticleCreate from './article-create'

export default function Article(props) {
    return(
        <div>
            <h1>Articles</h1>
            <ArticleCreate url={props.url} api={props.api} />
        </div>
    )
}