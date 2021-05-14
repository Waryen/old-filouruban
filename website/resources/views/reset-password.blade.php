@extends('layouts.admin')

@section('title')
<title>Administration - Réinitialiser mon mot de passe</title>
@endsection

@section('body')
    <div id="react-password-reset"></div>
    <div class="password-reset">
        <h1>Réinitialiser mon mot de passe</h1>
        <p><a href="/">Revenir vers le site</a></p>
        <form action="/reset-password" method="post">
            @csrf
            <div class="email">
                <label for="email">Votre adresse e-mail</label>
                <input type="email" name="email" id="email" required>
            </div>
            <div class="password">
                <label for="password">Votre nouveau mot de passe</label>
                <input type="password" name="password" id="password" required>
            </div>
            <div class="password-confirmation">
                <label for="password-confirmation">Confirmez votre mot de passe</label>
                <input type="password" name="password_confirmation" id="password-confirmation" required>
            </div>
            <div class="submit">
                <button type="submit">Réinitialiser votre mot de passe</button>
            </div>
        </form>
    </div>
@endsection