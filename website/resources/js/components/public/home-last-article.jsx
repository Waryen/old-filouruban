import axios from 'axios'
import React from 'react'

export default class HomeLastArticle extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            article: {},
            isLoading: true,
        }

        this.getLastArticle = this.getLastArticle.bind(this)
        this.loading = this.loading.bind(this)
    }

    componentDidMount() {
        this.getLastArticle()
    }

    // Récupère le dernier article
    getLastArticle() {
        axios.get(`${this.props.url}/api/article?api_token=${this.props.api}`)
        .then(response => {
            if(response.status == 200) {
                let articles = response.data
                let last = articles.length
                this.setState({ article: articles[last - 1] })
            }
        })
    }

    loading() {
        this.setState({ isLoading: false })
    }

    setId(catId, artId) {
        sessionStorage.setItem('catId', catId)
        sessionStorage.setItem('artId', artId)
    }

    render() {
        const article = this.state.article

        if(this.state.isLoading) {
            return(
                <div className="home-last-article">
                    <p className="loading">Chargement ...</p>
                    <img src={`${this.props.url}/media/images/articles/article-${article.image_id}.jpg`} style={{display: 'none'}} onLoad={this.loading} />
                </div>
            )
        } else {
            return(
                <div className="home-last-article">
                    <h2 className="last-article-title">Notre dernière création</h2>
                    <figure>
                        <a href={`${this.props.url}/articles/${article.categories_id}/${article.id}`} onClick={this.setId(article.categories_id, article.id)}>
                            <img src={`${this.props.url}/media/images/articles/article-${article.image_id}.jpg`} alt={`Image de l'article: ${article.name}`} />
                        </a>
                    </figure>
                    <a href={`${this.props.url}/articles/${article.categories_id}/${article.id}`} className="link-to-art" onClick={this.setId(article.categories_id, article.id)}>{article.name}</a>
                </div>
            )
        }
    }
}