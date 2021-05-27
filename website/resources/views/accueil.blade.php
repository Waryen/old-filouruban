@extends('layouts.public')

@section('title')
<title>Filouruban - Accueil</title>
@endsection

@section('body')
    <div class="home-alert">
        <p>Filouruban est en phase de développement, finalisation prévue pour le 29 mai 2021.</p>
        <p>(Cliquer sur ce message pour le faire disparaître)</p>
    </div>
    <div class="home">
        <div id="react-message"></div>
        <div id="react-home-last-article"></div>
        <div class="home-about">
            <h2 class="about-title">A propos de Filouruban</h2>
            <div class="about-content">
                <p>Fil ou Ruban, c’est l’histoire d’une fille passionnée de couture. Ce blog met en avant mes créations 100 % uniques et faites mains.</p>
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