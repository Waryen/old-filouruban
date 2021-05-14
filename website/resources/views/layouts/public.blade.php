<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="author" content="Sophie Gomand">
    <meta name="copyright" content="Filouruban">
    <meta name="description" content="Filouruban est une marque de produits artisanales fabriqués en Belgique et 100% éco-responsable !">
    <meta name="keywords" content="filouruban, artisanat, couture, belgique, wavre, bio, éco-responsable">
    <meta name="robots" content="noindex,nofollow"> <!-- Empêche l'indexation par les moteurs de recherche -->
    <meta name="token" id="token" content="{{ csrf_token() }}">
    <meta name="url" id="url" content="{{ env('APP_URL') }}">
    <!-- FAVICON -->
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('favicon/apple-touch-icon.png') }}">
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('favicon/favicon-32x32.png') }}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('favicon/favicon-16x16.png') }}">
    <link rel="manifest" href="{{ asset('favicon/site.webmanifest') }}">
    <link rel="mask-icon" href="{{ asset('favicon/safari-pinned-tab.svg') }}" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#00aba9">
    <meta name="theme-color" content="#ffffff">
    <!-- CSS -->
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.3/css/all.css" integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk" crossorigin="anonymous">
    <!-- SCRIPT -->
    <script src="{{ asset('js/app.js') }}" defer></script>
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-5VYVFR1KNC"></script>
    <script>
    window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-5VYVFR1KNC');
    </script>
    <script src="js/tarteaucitron/tarteaucitron.js"></script>
    <script>
        tarteaucitron.init({
            "privacyUrl": "", /* Privacy policy url */
        
            "hashtag": "#tarteaucitron", /* Open the panel with this hashtag */
            "cookieName": "tarteaucitron", /* Cookie name */
        
            "orientation": "middle", /* Banner position (top - bottom - middle - popup) */
        
            "groupServices": false, /* Group services by category */
        
            "showAlertSmall": false, /* Show the small banner on bottom right */
            "cookieslist": false, /* Show the cookie list */
            
            "showIcon": false, /* Show cookie icon to manage cookies */
            // "iconSrc": "", /* Optionnal: URL or base64 encoded image */
            "iconPosition": "BottomRight", /* Position of the icon between BottomRight, BottomLeft, TopRight and TopLeft */
        
            "adblocker": false, /* Show a Warning if an adblocker is detected */
        
            "DenyAllCta" : true, /* Show the deny all button */
            "AcceptAllCta" : true, /* Show the accept all button when highPrivacy on */
            "highPrivacy": true, /* HIGHLY RECOMMANDED Disable auto consent */
        
            "handleBrowserDNTRequest": false, /* If Do Not Track == 1, disallow all */
        
            "removeCredit": false, /* Remove credit link */
            "moreInfoLink": true, /* Show more info link */
            "useExternalCss": false, /* If false, the tarteaucitron.css file will be loaded */
        
            //"cookieDomain": ".my-multisite-domaine.fr", /* Shared cookie for subdomain website */
        
            "readmoreLink": "", /* Change the default readmore link pointing to tarteaucitron.io */
            
            "mandatory": true /* Show a message about mandatory cookies */
        });

        // Google Analytics
        tarteaucitron.user.gtagUa = 'G-5VYVFR1KNC';
        // tarteaucitron.user.gtagCrossdomain = ['example.com', 'example2.com'];
        tarteaucitron.user.gtagMore = function () { /* add here your optionnal gtag() */ };
        (tarteaucitron.job = tarteaucitron.job || []).push('gtag');
    </script>
    @yield('title')
</head>
<body>
<div id="wrapper">
    @include('layouts.public.header')
    <main>
    @yield('body')
    </main>
    @include('layouts.public.footer')
</div>
</body>
</html>