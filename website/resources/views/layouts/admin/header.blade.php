<header class="footer">
    <nav><a href="/">Revenir vers le site</a></nav>
    <p>Bonjour, {{ Auth::user()->firstname }} {{ Auth::user()->lastname }}.</p>
    @php
        if(Auth::user()) {
            echo '<div id="react-logout"></div>';
        }
    @endphp
</header>