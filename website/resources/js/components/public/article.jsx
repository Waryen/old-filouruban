import React from 'react'
import axios from 'axios'
import Commentary from './commentary'

class Article extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            article: {},
            isLoading: true,
        }

        this.zoomImg = this.zoomImg.bind(this)
        this.divide = this.divide.bind(this)
        this.loaded = this.loaded.bind(this)
    }

    // Récupèr l'id de l'article dans la session storage ainsi que celui-ci dans la DB
    componentDidMount() {
        this.hideWrapper()
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

    hideWrapper() {
        const zoomWrapper = document.querySelector('.zoom-wrapper')
        zoomWrapper.style.display = 'none'
        zoomWrapper.setAttribute('aria-hidden', 'true')
    }

    // Gestion du zoom de l'image
    zoomImg() {
        const wrapper = document.querySelector('.zoom-wrapper')
        const main = document.querySelector('main')
        wrapper.style.display = 'flex'
        wrapper.setAttribute('aria-hidden', 'false')
        main.setAttribute('aria-hidden', 'true')

        wrapper.addEventListener('click', () => {
            main.setAttribute('aria-hidden', 'false')
            wrapper.setAttribute('aria-hidden', 'true')
            wrapper.style.display = 'none'
        })

        window.addEventListener('keydown', (e) => {
            if(e.key == 'Escape' && wrapper.style.display == 'flex') {
                main.setAttribute('aria-hidden', 'false')
                wrapper.setAttribute('aria-hidden', 'true')
                wrapper.style.display = 'none'
            }
        })

        window.addEventListener('keydown', (e) => {
            if(e.key == 'Tab' && wrapper.style.display == 'flex') {
                e.preventDefault()
            }
        })
    }

    // Ajoute des sauts de ligne dans la description de l'article
    divide(txt) {
        txt = txt.split('\n')
        let array = []

        for(let i = 0; i < txt.length; i++) {
            array.push(
                <p key={i}>{txt[i]}</p>
            )
        }

        return array
    }

    loaded() {
        this.setState({ isLoading: false })
    }

    render() {
        const name = this.state.article.name
        const desc = this.divide(String(this.state.article.description))
        const image = this.state.article.image_id
        const img = <img src={`${this.props.url}/media/images/articles/article-${image}.jpg`} alt={`Photo de l'article: ${name}`} className="article-img" onLoad={() => {this.loaded()}} />

        if(this.state.isLoading) {
            return(
                <div className="article">
                    <p className="loading-text">Chargement...</p>
                    <div style={{display: 'none'}}>
                        {img}
                    </div>
                    <div className="zoom-wrapper"></div>
                </div>
            )
        } else {
            return(
                <div className="article">
                    <div className="article-card">
                        <h2 className="article-title">{name}</h2>
                        <figure>
                            <img src={`${this.props.url}/media/images/articles/article-${image}.jpg`} alt={`Photo de l'article: ${name}`} className="article-img" onClick={() => {this.zoomImg()}} />
                        </figure>
                        <div className="article-desc">
                            {desc}
                        </div>
                    </div>
                    <Commentary url={this.props.url} api={this.props.api} artId={this.state.article.id} />
                    <div className="zoom-wrapper">
                        <p>Cliquer pour dézoomer</p>
                        <figure>
                            <img src={`${this.props.url}/media/images/articles/article-${image}.jpg`} alt={`Photo de l'article: ${name}`} className="article-img" />
                        </figure>
                    </div>
                </div>
            )
        }
    }
}

export default Article