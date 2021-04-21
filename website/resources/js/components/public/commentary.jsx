import React from 'react'
import axios from 'axios'

class Commentary extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            commentaries: [],
        }
    }

    // Récupération des commentaires
    componentDidMount() {
        axios
            .get(`${this.props.url}/api/commentary?api_token=${this.props.api}`)
            .then(response => {
                if(response.status == 200) {
                    this.setState({ commentaries: response.data })
                }
            })
    }

    render() {
        // Rendu des commentaires de l'article
        const commentaires = this.state.commentaries
        const artId = this.props.artId
        let comList = commentaires.filter(el => el.articles_id == artId)
        let renderList = []

        if(comList.length) {
            comList.forEach(el => {
                renderList.push(
                    <li key={el.id}>
                        <h3>{el.firstname} {el.lastname}</h3>
                        <p>{el.content}</p>
                        <p>Envoyé le: {el.date}</p>
                    </li>
                )
            })
        } else {
            renderList.push(
                <li>
                    <p>Il n'y a pas encore d'avis</p>
                </li>
            )
        }

        return(
            <div>
                <div className="com-list">
                    <h2>Avis des internautes</h2>
                    <ul>
                        {renderList}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Commentary