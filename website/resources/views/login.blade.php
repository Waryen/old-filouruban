@extends('layouts.admin')

@section('title')
<title>Connexion à l'administration</title>
@endsection

@section('body')
    <h1>Connexion à l'administration</h1>
    <div id="react-login"></div>
    @php
        if(Auth::user()) {
            echo '<div id="react-logout"></div>';
        }
    @endphp
@endsection