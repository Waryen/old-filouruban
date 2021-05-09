@component('mail::message')
# Un nouvel article a été ajouté sur filouruban.be

<a href="{{ env('APP_URL') }}/articles/{{ $data['categoryId'] }}/{{ $data['articleId'] }}" target="_blank">
    <img src="{{ env('APP_URL') }}/media/images/articles/article-{{ $data['imageSlug'] }}.jpg" alt="image de l'article {{ $data['name'] }}">
</a>
<br>
Ce message a été envoyé automatiquement, veuillez ne pas y répondre.
@endcomponent
