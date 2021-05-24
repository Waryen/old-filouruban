import React from 'react'
import axios from 'axios'

class HomeArticles extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            articles: [],
            artId: '',
            catId: '',
            isLoading: true,
        }

        this.getArticles = this.getArticles.bind(this)
        this.getRandomInt = this.getRandomInt.bind(this)
        this.randomArticles = this.randomArticles.bind(this)
        this.setId = this.setId.bind(this)
        this.loaded = this.loaded.bind(this)
    }

    componentDidMount() {
        this.getArticles()
    }

    // Récupère la liste des articles
    getArticles() {
        axios.get(`${this.props.url}/api/article?api_token=${this.props.api}`)
        .then(response => {
            if(response.status == 200) {
                this.setState({ articles: this.randomArticles(response.data) })
            }
        })
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max)
    }

    // Récupère 3 articles aléatoirement
    randomArticles(els) {
        const max = els.length
        let articles = []

        if(max == 1) {
            articles.push(els[0])
        } else if(max == 2) {
            els.forEach(el => {
                articles.push(el)
            })
        } else if(max == 3) {
            els.forEach(el => {
                articles.push(el)
            })
        } else {
            let first = this.getRandomInt(max)
            let second = this.getRandomInt(max)
            let third = this.getRandomInt(max)
    
            if(first == second || first == third || second == third) {
                while(first == second || first == third || second == third) {
                    first = this.getRandomInt(max)
                    second = this.getRandomInt(max)
                    third = this.getRandomInt(max)
                }
            }
    
            articles.push(els[first])
            articles.push(els[second])
            articles.push(els[third])
        }

        return articles
    }

    // Sauvegarde l'id de l'article et de la catégorie dans le sessionStorage
    setId(artId, catId, artSlug) {
        sessionStorage.setItem('artId', artId)
        sessionStorage.setItem('catId', catId)
        sessionStorage.setItem('artSlug', artSlug)
    }

    loaded() {
        this.setState({ isLoading: false})
    }

    render() {
        const articles = this.state.articles
        let list = []
        articles.forEach(el => {
            list.push(
                <li key={el.id}>
                    <a href={`articles/${el.categories_id}/${el.id}`} onClick={() => {this.setId(el.id, el.categories_id, el.slug)}}>
                        <figure>
                            <img src={`${this.props.url}/media/images/articles/article-${el.image_id}.jpg`} alt={`Photo de l'article: ${el.name}`} onLoad={() => {this.loaded()}}/>
                        </figure>
                        <h3>{el.name}</h3>
                    </a>
                </li>
            )
        })

        if(this.state.isLoading) {
            return(
                <div className="home-articles">
                    <p className="loading-text">Chargement...</p>
                    <ul style={{display: 'none'}}>
                        {list}
                    </ul>
                </div>
            )
        } else {
            return(
                <div className="home-articles">
                    <ul>
                        {list}
                    </ul>
                </div>
            )
        }
    }
}

export default HomeArticles