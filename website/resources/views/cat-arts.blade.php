@extends('layouts.public')

@section('title')
<title>Filouruban - {{$category->name}}</title>
@endsection

@section('body')
<div class="category-articles">
    <div class="ariane">
        <p>
            <a href="/">Accueil</a>
            &nbsp;-&nbsp;
            <a href="/articles">Articles</a>
            &nbsp;-&nbsp;
            <a href="#" id="ariane-active">{{$category->name}}</a>
        </p>
    </div>
    <h2 class="cat-arts-title">{{$category->name}}</h2>
    <div class="cat-arts-desc">

    </div>
    <div id="react-category"></div>
</div>
@endsection