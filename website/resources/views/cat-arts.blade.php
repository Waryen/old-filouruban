@extends('layouts.public')

@section('title')
<title>Filouruban - {{$category->name}}</title>
@endsection

@section('body')
<div class="category-articles">
    <h2 class="cat-arts-title">{{$category->name}}</h2>
    <p class="cat-arts--desc">{{$category->description}}</p>
    <div id="react-category"></div>
</div>
@endsection