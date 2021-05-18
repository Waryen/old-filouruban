import axios from 'axios'
import React from 'react'
import ArticleCreate from './article-create'
import ArticleList from './article-list'

export default class Article extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            articles: [],
        }

        this.getArticles = this.getArticles.bind(this)
        this.updateData = this.updateData.bind(this)
    }

    componentDidMount() {
        this.getArticles()
    }

    getArticles () {
        axios.get(`${this.props.url}/api/article?api_token=${this.props.api}`)
        .then(response => {
            if(response.status == 200) {
                this.setState({ articles: response.data })
            }
        })
    }

    updateData() {
        this.getArticles()
    }

    render() {
        return(
            <div className="admin-articles">
                <h2>Articles</h2>
                <ArticleCreate url={this.props.url} api={this.props.api} auth={this.props.auth} update={this.updateData} />
                <ArticleList url={this.props.url} api={this.props.api} articles={this.state.articles} update={this.updateData} />
            </div>
        )
    }
}