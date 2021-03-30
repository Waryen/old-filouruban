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
    <div>
        <h2>Identifiants</h2>
        <p>
            email: wmonahan@example.com
            <br>
            mdp: password
        </p>
    </div>
    @php
        var_dump(Auth::user());
    @endphp
@endsection