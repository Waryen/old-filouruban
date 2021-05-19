@extends('layouts.admin')

@section('title')
<title>Administration - Réinitialiser mon mot de passe</title>
@endsection

@section('body')
    <div class="password-reset">
        <h1>Réinitialiser mon mot de passe</h1>
        <form action="/forgot-password" method="post">
            @csrf
            <div class="email">
                <label for="email">Votre adresse e-mail</label>
                <input type="email" name="email" id="email" required>
            </div>
            <div class="submit">
                <button type="submit">Envoyer</button>
            </div>
        </form>
        <p class="email-infos">Vous recevrez un lien pour réinitialiser votre mot de passe dans votre boîte de réception.</p>
    </div>
@endsection