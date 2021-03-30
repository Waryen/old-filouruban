@extends('layouts.admin')

@section('title')
<title>Connexion à l'administration</title>
@endsection

@section('body')
    <h1>Connexion à l'administration</h1>
    <div id="react-login"></div>
    <div>
        <h2>Identifiants</h2>
        <p>
            email: wmonahan@example.com
            <br>
            mdp: password
        </p>
    </div>
    @php
        if(Auth::user()) {
            var_dump(Auth::user());
        }
    @endphp
@endsection