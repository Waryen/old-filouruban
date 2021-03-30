<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="robots" content="noindex"> <!-- Empêche l'indexation par les moteurs de recherche -->
    <meta name="token" id="token" content="{{ csrf_token() }}">
    <meta name="url" id="url" content="{{ env('APP_URL') }}">
    <meta name="auth" id="auth" content="{{ Auth::user() }}">
    <!-- FAVICON -->
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('favicon/apple-touch-icon.png') }}">
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('favicon/favicon-32x32.png') }}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('favicon/favicon-16x16.png') }}">
    <link rel="manifest" href="{{ asset('favicon/site.webmanifest') }}">
    <link rel="mask-icon" href="{{ asset('favicon/safari-pinned-tab.svg') }}" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#00aba9">
    <meta name="theme-color" content="#ffffff">
    <!-- SCRIPT -->
    <script src="{{ asset('js/app.js') }}" async></script>
    @yield('title')
</head>
<body>
<div id="wrapper">
    @include('layouts.header')
    <main>
    @yield('body')
    </main>
    @include('layouts.footer')
</div>
</body>
</html>