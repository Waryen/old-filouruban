<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="robots" content="noindex">
    <meta name="token" id="token" content="{{ csrf_token() }}">
    <meta name="url" id="url" content="{{ env('APP_URL') }}">
    <script src="{{ asset('js/app.js') }}" async></script>
    @yield('title')
</head>
<body>
@yield('body')
</body>
</html>