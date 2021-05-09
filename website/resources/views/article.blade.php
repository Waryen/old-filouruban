@extends('layouts.public')

@section('title')
<title>Filouruban - {{$article->name}}</title>
@endsection

@section('body')
    <div class="ariane">
        <p>
            <a href="/">Accueil</a>
            &nbsp;-&nbsp;
            <a href="/articles">Articles</a>
            &nbsp;-&nbsp;
            <a href="/articles/{{$category->id}}">{{$category->name}}</a>
            &nbsp;-&nbsp;
            <a href="#" id="ariane-active">{{$article->name}}</a>
        </p>
    </div>
    <div id="react-article"></div>
@endsection