@extends('layouts.admin')

@section('title')
<title>Administration - Réinitialiser mon mot de passe</title>
@endsection

@section('body')
    <div class="password-reset">
        <h1>Réinitialiser mon mot de passe</h1>
        <form action="/reset-password" method="post">
            @csrf
            <div class="email">
                <label for="email">Votre adresse e-mail</label>
                <input type="email" name="email" id="email" required>
            </div>
            <div class="password">
                <label for="password">Votre nouveau mot de passe</label>
                <input type="password" name="password" id="password" required onkeyup="check()">
            </div>
            <div class="password-confirmation">
                <label for="password-confirmation">Confirmez votre mot de passe</label>
                <input type="password" name="password_confirmation" id="password-confirmation" required onkeyup="check()">
            </div>
            <input type="hidden" name="token" value="{{$token}}">
            <div class="submit">
                <button type="submit" id="btn-submit">Réinitialiser votre mot de passe</button>
            </div>
            <p id="pwd-check"></p>
        </form>
    </div>
    @if (isset($errors) && count($errors))
     
        There were {{count($errors->all())}} Error(s)
                    <ul>
                @foreach($errors->all() as $error)
                    <li>{{ $error }} </li>
                @endforeach
            </ul>
            
    @endif
    <script>
        let pwd = document.getElementById('password')
        let pwdConf = document.getElementById('password-confirmation')
        let pwdCheck = document.getElementById('pwd-check')
        let submit = document.getElementById('btn-submit')
        pwdCheck.style.display = 'none'

        let check = function() {
            if(pwd.value != pwdConf.value) {
                pwdCheck.style.display = 'block'
                pwdCheck.innerHTML = 'Vos mots de passes ne sont pas identiques !'
                submit.disabled = true
            } else {
                pwdCheck.style.display = 'none'
                submit.disabled = false
            }
        }
    </script>
@endsection