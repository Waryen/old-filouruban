@extends('layouts.public')

@section('title')
<title>Filouruban - Articles de la catégorie: {{$category->name}}</title>
@endsection

@section('body')
<h1 class="main-title">Liste des articles de la catégoire: {{$category->name}}</h1>
<p class="el-desc">{{$category->description}}</p>
<div id="react-category"></div>
@endsection