import React from 'react'
import {Link} from 'react-router-dom'

function Navigation() {
    return(
        <nav>
            <ul>
                <Link to="/">
                    <li>Tableau de bord</li>
                </Link>
                <Link to="/admin">
                    <li>Administrateurs</li>
                </Link>
                <Link to="/article">
                    <li>Articles</li>
                </Link>
                <Link to="/categorie">
                    <li>Catégories</li>
                </Link>
                <Link to="/commentaire">
                    <li>Commentaires</li>
                </Link>
                <Link to="/message">
                    <li>Messages</li>
                </Link>
                <Link to="/contact">
                    <li>Contact</li>
                </Link>
                <Link to="/subscriber">
                    <li>Abonnés</li>
                </Link>
            </ul>
        </nav>
    )
}

export default Navigation