@extends('layouts.public')

@section('title')
<title>Filouruban - Catégories</title>
@endsection

@section('body')
    <div class="categories">
        <div class="ariane">
            <p>
                <a href="/">Accueil</a>
                &nbsp;-&nbsp;
                <a href="#" id="ariane-active">Articles</a>
            </p>
        </div>
        <h2 class="categories-title">Catégories</h2>
        <div id="react-categories"></div>
    </div>
@endsection