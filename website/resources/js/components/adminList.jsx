import React from 'react'

class AdminList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            articles: [],
        }
    }

    componentDidMount() {
        axios.get(`${this.props.url}/api/article?api_token=${this.props.api}`)
        .then(response => this.setState({articles: response.data}))
    }

    render() {
        const list = []
        this.state.articles.forEach(el => {
            list.push(
                <li key={el.id}>
                    <h2>{el.name}</h2>
                    <p>{el.description}</p>
                </li>
            )
        })

        return (
            <div>
                <h2>Liste des articles</h2>
                <ul>
                    {list}
                </ul>
            </div>
        )
    }
}

export default AdminList