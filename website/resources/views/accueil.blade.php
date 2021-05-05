@extends('layouts.public')

@section('title')
<title>Filouruban - Accueil</title>
@endsection

@section('body')
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
@endsection