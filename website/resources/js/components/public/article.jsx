import React from 'react'
import axios from 'axios'
import Commentary from './commentary'

class Article extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            article: {},
        }
    }

    // Récupèr l'id de l'article dans la session storage ainsi que celui-ci dans la DB
    componentDidMount() {
        let artId = JSON.parse(sessionStorage.getItem('artId'))
        
        if(artId == undefined) {
            let tmp = window.location.href
            let array = tmp.split('/')
            let max = array.length
            artId = array[max - 1]
            let catId = array[max - 2]
            sessionStorage.setItem('artId', artId)
            sessionStorage.setItem('catId', catId)
        }

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
            <div className="article">
                <div className="article-card">
                    <h2 className="article-title">{name}</h2>
                    <figure>
                        <img src={`${this.props.url}/media/images/articles/article-${image}.jpg`} alt={`Photo de l'article: ${name}`} />
                    </figure>
                    <p className="article-desc">{desc}</p>
                </div>
                <Commentary url={this.props.url} api={this.props.api} artId={this.state.article.id} />
            </div>
        )
    }
}

export default Article