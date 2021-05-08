import React from 'react'
import axios from 'axios'

export default class SearchResult extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
            articles: [],
        }

        this.setId = this.setId.bind(this)
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

    render() {
        let list = []
        const {search, articles} = this.state
        const filtre = articles.filter(el => el.name.toLowerCase().includes(search.toLowerCase()))

        if(filtre.length) {
            filtre.forEach(el => {
                list.push(
                    <li key={el.id}>
                        <a href={`articles/${el.categories_id}/${el.id}`} onClick={() => {this.setId(el.id, el.categories_id)}}>
                            <figure>
                                <img src={`${this.props.url}/media/images/articles/article-${el.image_id}.jpg`} alt={`Photo de l'article: ${el.name}`}/>
                            </figure>
                            <h3>{el.name}</h3>
                        </a>
                    </li>
                )
            })
        } else {
            list = <p className="error">Il n'existe aucun article portant ce nom:<br></br>{search}</p>
        }

        return(
            <div className="search-result">
                <h2>Résultats de votre recherche</h2>
                <ul>
                    {list}
                </ul>
            </div>
        )
    }
}