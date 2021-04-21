import React from 'react'
import axios from 'axios'

class Category extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            catId: undefined,
            articles: [],
            categoryName: '',
            categoryDesc: '',
            url: window.location.href
        }

        this.saveId = this.saveId.bind(this)
    }

    // Récupère l'Id de la catégorie et la liste des articles
    componentDidMount() {
        const id = JSON.parse(sessionStorage.getItem('catId'))
        this.setState({ catId: id })

        axios
            .get(`${this.props.url}/api/article?api_token=${this.props.api}`)
            .then(response => {
                if(response.status == 200) {
                    this.setState({ articles: response.data })
                }
            })

        axios
            .get(`${this.props.url}/api/category/${id}?api_token=${this.props.api}`)
            .then(response => this.setState({
                categoryName: response.data.name ,
                categoryDesc: response.data.description,
            }))

        /*if(sessionStorage.getItem('artId')) {
            sessionStorage.removeItem('artId')
        }*/
    }

    componentWillUnmount() {
        this.setState({
            catId: undefined,
            articles: [],
        })

        /*sessionStorage.removeItem('catId')*/
    }

    saveId(value) {
        return function() {
            const id = value
            sessionStorage.setItem('artId', id)
        }
    }

    render() {
        // Rendu de la liste des articles de la catégorie spécifique
        const articles = this.state.articles
        const catId = this.state.catId
        let articlesList = []

        articles.forEach(el => {
            if(el.categories_id == catId) {
                articlesList.push(
                    <li key={el.id}>
                        <h3>{el.name}</h3>
                        <a href={`${this.state.url}/${el.id}`} onClick={this.saveId(el.id)} className="art-img"><img src={`${this.props.url}/media/images/articles/article-${el.image_id}.jpg`} alt={`Image de l'article ${el.name}`} /></a>
                        <a href={`${this.state.url}/${el.id}`} onClick={this.saveId(el.id)}>Voir l'article</a>
                    </li>
                )
            }
        })

        return(
            <div>
                <ul>
                    {articlesList}
                </ul>
            </div>
        )
    }
}

export default Category