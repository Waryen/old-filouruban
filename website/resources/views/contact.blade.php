@extends('layouts.public')

@section('title')
<title>Contact</title>
@endsection

@section('body')
    <div class="contact">
        <h2 class="contact-title">Contacter Filouruban</h2>
        <p class="contact-infos">
            Vous avez une question à nous poser ? Un article vous intéresse ? N'hésitez pas à nous contacter !
        </p>
        <div id="react-contact"></div>
        <div class="social-media">
            <h3 class="social-title">Vous pouvez également nous contacter via nos réseaux sociaux</h3>
            <ul>
                <li>
                    <h4>Facebook</h4>
                    <a href="https://www.facebook.com/Fil-ou-Ruban-103144908649921" target="_blank" class="fb-link"><i class="fab fa-facebook"></i></a>
                </li>
                <!--<li>
                    <h4>Instagram</h4>
                    <a href="#" class="insta-link"><i class="fab fa-instagram"></i></a>
                </li>-->
            </ul>
        </div>
    </div>
@endsection