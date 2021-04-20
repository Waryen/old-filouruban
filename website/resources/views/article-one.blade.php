@extends('layouts.public')

@section('tile')
<title>Filouruban - {{$article->name}}</title>
@endsection

@section('body')
    <h2>Hello World ! {{$article->name}}</h2>
@endsection