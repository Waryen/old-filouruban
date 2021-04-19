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
        }
    }

    // Récupère l'Id de la catégorie et la liste des articles
    componentDidMount() {
        const url = window.location.pathname.split('/')
        this.setState({ catId: url[2] })

        axios.get(`${this.props.url}/api/article?api_token=${this.props.api}`)
            .then(response => {
                if(response.status == 200) {
                    this.setState({ articles: response.data })
                }
            })

        axios
            .get(`${this.props.url}/api/category/${url[2]}?api_token=${this.props.api}`)
            .then(response => this.setState({
                categoryName: response.data.name ,
                categoryDesc: response.data.description,
            }))
    }

    componentWillUnmount() {
        this.setState({
            catId: undefined,
            articles: [],
        })
    }

    render() {
        // Rendu de la liste des articles de la catégorie spécifique
        const articles = this.state.articles
        const catId = this.state.catId
        const catName = this.state.categoryName
        const catDesc = this.state.categoryDesc
        let articlesList = []

        articles.forEach(el => {
            if(el.categories_id == catId) {
                articlesList.push(
                    <li key={el.id}>
                        <h3>{el.name}</h3>
                        <p>{el.description}</p>
                        <a href="#" className="art-img"><img src={`${this.props.url}/media/images/articles/article-${el.image_id}.jpg`} alt={`Image de l'article ${el.name}`} /></a>
                        <a href="#">Voir l'article</a>
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