@extends('layouts.public')

@section('title')
<title>Filouruban - {{$category->name}}</title>
@endsection

@section('body')
    <h1 class="main-title">{{$category->name}}</h1>
    <p class="main-desc">{{$category->description}}</p>
    <div id="react-category"></div>
@endsection