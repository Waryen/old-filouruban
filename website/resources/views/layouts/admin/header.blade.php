<header class="header">
    <nav><a href="/">Revenir vers le site</a></nav>
    @auth
        <p>Bonjour, &nbsp;<span>{{ Auth::user()->firstname }} {{ Auth::user()->lastname }}</span>.</p>
    @endauth
    @php
        if(Auth::user()) {
            echo '<div id="react-logout"></div>';
        }
    @endphp
</header>