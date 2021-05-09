@extends('layouts.public')

@section('title')
<title>Filouruban - {{$category->name}}</title>
@endsection

@section('body')
<div class="category-articles">
    <div class="ariane">
        <p>
            <a href="/">Accueil</a>
            &nbsp;-&nbsp;
            <a href="/articles">Articles</a>
            &nbsp;-&nbsp;
            <a href="#" id="ariane-active">{{$category->name}}</a>
        </p>
    </div>
    <h2 class="cat-arts-title">{{$category->name}}</h2>
    <div class="cat-arts-desc">

    </div>
    <p id="desc-to-pick" style="display: none">{{$category->description}}</p>
    <div id="react-category"></div>
</div>

<script defer>
    let temp = document.querySelector('#desc-to-pick').innerHTML
    let div = document.querySelector('.cat-arts-desc')
    txt = temp.split('\n')

    for(let i = 0; i < txt.length; i++) {
        let p = document.createElement('p')
        p.innerHTML = txt[i]
        div.appendChild(p)
    }
</script>
@endsection