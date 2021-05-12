import React from 'react'
import axios from 'axios'

class Carousel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            articles: [],
        }

        this.getArticles = this.getArticles.bind(this)
        this.randomArticles = this.randomArticles.bind(this)
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

    carrousel() {
        let slides = document.getElementsByClassName('slide')
        const one = slides[0]
        const two = slides[1]
        const three = slides[2]

        one.style.display = 'block'
        two.style.display = 'none'
        three.style.display = 'none'
    }

    render() {
        const articles = this.state.articles
        if(articles.length) {
            const one = articles[0]
            const two = articles[1]
            const three = articles[2]

            return(
                <div className="home-carousel" onLoad={() => {this.carrousel()}}>
                    <div className="slide one">
                        <img src={`${this.props.url}/media/images/articles/article-${one.image_id}.jpg`} alt="" style={{width: "250px"}} />
                    </div>
                    <div className="slide two">
                        <img src={`${this.props.url}/media/images/articles/article-${two.image_id}.jpg`} alt="" style={{width: "250px"}} />
                    </div>
                    <div className="slide three">
                        <img src={`${this.props.url}/media/images/articles/article-${three.image_id}.jpg`} alt="" style={{width: "250px"}} />
                    </div>
                </div>
            )
        } else {
            return(
                <div className="carousel">
                    <p className="loading-text">Chargement...</p>
                </div>
            )
        }
    }
}

export default Carousel