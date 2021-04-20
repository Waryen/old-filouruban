import React from 'react'
import axios from 'axios'

class Article extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            article: {},
        }
    }

    // Récupèr l'id de l'article dans la session storage ainsi que celui-ci dans la DB
    componentDidMount() {
        const artId = JSON.parse(sessionStorage.getItem('artId'))

        axios
            .get(`${this.props.url}/api/article/${artId}?api_token=${this.props.api}`)
            .then(response => {
                if(response.status == 200) {
                    this.setState({ article: response.data })
                }
            })
    }

    render() {
        const name = this.state.article.name
        const desc = this.state.article.description
        const image = this.state.article.image_id

        return(
            <div className="card">
                <h2 className="main-title">{name}</h2>
                <figure>
                    <img src={`${this.props.url}/media/images/articles/article-${image}.jpg`} alt={`Photo de l'article: ${name}`} />
                </figure>
                <p>{desc}</p>
            </div>
        )
    }
}

export default Article