import axios from 'axios'
import React from 'react'
import CommentaryList from './commentaire-list'

export default class Commentaire extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            commentaries: [],
            articles: [],
        }

        this.getArticles = this.getArticles.bind(this)
        this.getCommentaries = this.getCommentaries.bind(this)
        this.updateData = this.updateData.bind(this)
    }

    componentDidMount() {
        this.getArticles()
        this.getCommentaries()
    }

    getCommentaries() {
        axios.get(`${this.props.url}/api/commentary?api_token=${this.props.api}`)
        .then(response => {
            if(response.status == 200) {
                this.setState({ commentaries: response.data })
            }
        })
    }

    getArticles() {
        axios.get(`${this.props.url}/api/article?api_token=${this.props.api}`)
        .then(response => {
            if(response.status == 200) {
                this.setState({ articles: response.data })
            }
        })
    }

    updateData() {
        this.getArticles()
        this.getCommentaries()
    }

    render() {
        return(
            <div className="admin-commentary">
                <h2>Commentaires</h2>
                <CommentaryList url={this.props.url} api={this.props.api} articles={this.state.articles} commentaries={this.state.commentaries} update={this.updateData} />
            </div>
        )
    }
}