import React from 'react'
import axios from 'axios'

export default class SearchResult extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
            articles: [],
            isLoading: true,
        }

        this.setId = this.setId.bind(this)
        this.loaded = this.loaded.bind(this)
    }

    componentDidMount() {
        if(sessionStorage.getItem('search')) {
            this.setState({ search: sessionStorage.getItem('search') })
        }

        axios.get(`${this.props.url}/api/article?api_token=${this.props.api}`)
            .then(response => {
                if(response.status == 200) {
                    this.setState({ articles: response.data })
                }
            })
    }

    componentWillUnmount() {
        this.setState({
            search: '',
            articles: []
        })

        sessionStorage.removeItem('search')
    }

    // Sauvegarde l'id de l'article et de la catégorie dans le sessionStorage
    setId(artId, catId) {
        sessionStorage.setItem('artId', artId)
        sessionStorage.setItem('catId', catId)
    }

    loaded() {
        this.setState({ isLoading: false })
    }

    render() {
        let list = []
        const {search, articles} = this.state
        const filtre = articles.filter(el => el.name.toLowerCase().includes(search.toLowerCase()))

        if(filtre.length) {
            filtre.forEach(el => {
                list.push(
                    <li key={el.id}>
                        <h3>{el.name}</h3>
                        <a href={`${this.state.url}/${el.id}`} onClick={this.setId(el.id, el.categories_id)} className="art-img">
                            <figure>
                                <img src={`${this.props.url}/media/images/articles/article-${el.image_id}.jpg`} alt={`Image de l'article ${el.name}`} onLoad={() => {this.loaded()}}  />
                            </figure>
                        </a>
                        <a href={`${this.state.url}/${el.id}`} onClick={this.setId(el.id, el.categories_id)} className="link-to-art">Voir l'article</a>
                    </li>
                )
            })
        } else {
            list = <p className="error">Aucun résultat n'a été trouvé pour: {search}</p>
        }

        if(this.state.isLoading) {
            if(filtre.length == 0) {
                return(
                    <div className="search-result">
                        <h2>Résultats de votre recherche pour: {search}</h2>
                        <ul>
                            {list}
                        </ul>
                    </div>
                )
            } else {
                return(
                    <div className="search-result">
                        <p className="loading-text">Chargement...</p>
                        <ul style={{display: 'none'}}>
                            {list}
                        </ul>
                    </div>
                )
            }
        } else {
            return(
                <div className="search-result">
                    <h2>Résultats de votre recherche pour: {search}</h2>
                    <ul>
                        {list}
                    </ul>
                </div>
            )
        }
    }
}