import React from 'react'
import axios from 'axios'

class Carousel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            articles: [],
            current: 0,
        }

        this.getRandomInt = this.getRandomInt.bind(this)
        this.getArticles = this.getArticles.bind(this)
        this.randomArticles = this.randomArticles.bind(this)
        this.setId = this.setId.bind(this)
        this.prevCard = this.prevCard.bind(this)
        this.nextCard = this.nextCard.bind(this)
    }

    componentDidMount() {
        this.getArticles()
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max)
    }

    // Récupère la liste des articles
    getArticles() {
        axios
            .get(`${this.props.url}/api/article?api_token=${this.props.api}`)
            .then(response => { response.status == 200 ? this.setState({ articles: this.randomArticles(response.data) }) : this.setState({ articles: null }) })
    }

    // Récupère 3 articles aléatoirement
    randomArticles(els) {
        const max = els.length
        let articles = []
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

        return articles
    }

    // Sauvegarde les id dans la session storage
    setId(catId, artId) {
        return function() {
            sessionStorage.setItem('catId', catId)
            sessionStorage.setItem('artId', artId)
        }
    }

    prevCard() {
        let prev = this.state.current

        if(prev != 0) {
            prev--
            this.setState({ current: prev })
        } else {
            this.setState({ current: 2 })
        }
    }

    nextCard() {
        let next = this.state.current

        if(next != 2) {
            next++
            this.setState({ current: next })
        } else {
            this.setState({ current: 0 })
        }
    }

    render() {
        const articles = this.state.articles
        const current = this.state.current
        let card
        articles.map(el => {
            if(current == 0) {
                card =
                    <div className="carousel-card">
                        <a href={`articles/${el.categories_id}/${el.id}`} onClick={this.setId(el.categories_id, el.id)}>
                            <img src={`${this.props.url}/media/images/articles/article-${el.image_id}.jpg`} alt={`Photo de l'article: ${el.name}`} />
                            <h3>{el.name}</h3>
                        </a>
                    </div>
            } else if(current == 1) {
                card =
                    <div className="carousel-card">
                        <a href={`articles/${el.categories_id}/${el.id}`} onClick={this.setId(el.categories_id, el.id)}>
                            <img src={`${this.props.url}/media/images/articles/article-${el.image_id}.jpg`} alt={`Photo de l'article: ${el.name}`} />
                            <h3>{el.name}</h3>
                        </a>
                    </div>
            } else if(current == 2) {
                card =
                    <div className="carousel-card">
                        <a href={`articles/${el.categories_id}/${el.id}`} onClick={this.setId(el.categories_id, el.id)}>
                            <img src={`${this.props.url}/media/images/articles/article-${el.image_id}.jpg`} alt={`Photo de l'article: ${el.name}`} />
                            <h3>{el.name}</h3>
                        </a>
                    </div>
            }
        })

        return(
            <div className="carousel-wrapper">
                <div className="carousel-container">
                    {card}
                    <div className="carousel-arrows">
                        <button onClick={ () => { this.prevCard() } }>Précédent</button>
                        <button onClick={ () => { this.nextCard() } }>Suivant</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Carousel