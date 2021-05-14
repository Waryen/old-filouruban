@extends('layouts.public')

@section('title')
<title>Filouruban - Accueil</title>
@endsection

@section('body')
    <div class="home-alert">
        <p>Filouruban est en phase de développement, finalisation prévue pour le 29 mai 2021.</p>
        <p>Toutes les données collectées pendant la phase de développement seront supprimées au plus tard pour le 29 mai 2021. <a href="legal">Plus d'infos sur la manière dont vos données sont utilisées</a></p>
    </div>
    <div class="home">
        <!--<div id="react-carousel"></div>-->
        <div class="home-about">
            <h2 class="about-title">A propos de Filouruban</h2>
            <div class="about-content">
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae eligendi debitis quis, necessitatibus accusantium odit sed labore! Nam quam distinctio, facere dolores nostrum laudantium voluptatem nesciunt blanditiis, perferendis eum nobis.</p>
                <a href="about">En savoir plus</a>
            </div>
        </div>
        <div id="react-home-articles"></div>
    </div>

    <script>
        const alertWrapper = document.querySelector('.home-alert')

        window.onload = () => {
            alertWrapper.style.display = 'block'
        }

        alertWrapper.addEventListener('click', () => {
            alertWrapper.style.display = 'none'
        })
    </script>
@endsection