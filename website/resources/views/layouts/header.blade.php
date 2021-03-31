<header>
    <h2>Header</h2>
    <nav>
        <ul>
            <li><a href="/">Accueil</a></li>
            <li><a href="admin">Administration</a></li>
        </ul>
    </nav>
    @php
        if(Auth::user()) {
            echo '<div id="react-logout"></div>';
        }
    @endphp
</header>