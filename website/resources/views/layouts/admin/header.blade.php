<header class="footer">
    <nav><a href="/">Revenir vers le site</a></nav>
    @auth
        <p>Bonjour, {{ Auth::user()->firstname }} {{ Auth::user()->lastname }}.</p>
    @endauth
    @php
        if(Auth::user()) {
            echo '<div id="react-logout"></div>';
        }
    @endphp
</header>