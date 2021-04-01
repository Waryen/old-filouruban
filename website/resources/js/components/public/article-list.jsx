import axios from 'axios'
import React from 'react'

class ArticleList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            articles: [],
            deleted: false,
        }

        this.deleteArticle = this.deleteArticle.bind(this)
    }

    componentDidMount() {
        axios.get(`${this.props.url}/api/article?api_token=${this.props.api}`)
            .then(response => this.setState({articles: response.data}))
    }

    deleteArticle(e) {
        const id = e.target.value
        axios.delete(`${this.props.url}/api/article/${id}?api_token=${this.props.api}`)
    }

    render() {
        const list = []
        this.state.articles.forEach(el => {
            list.push(
                <li key={el.id}>
                    <h2>{el.name}</h2>
                    <p>{el.description}</p>
                    {/*<button value={el.id} onClick={this.deleteArticle}>Supprimer</button>*/}
                </li>
            )
        })

        return (
            <div>
                <h2>Liste des articles</h2>
                <ul>
                    {list}
                </ul>
            </div>
        )
    }
}

export default ArticleList