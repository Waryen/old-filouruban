<header class="footer">
    <nav><a href="/">Revenir vers le site</a></nav>
    @php
        if(Auth::user()) {
            echo '<div id="react-logout"></div>';
        }
    @endphp
</header>