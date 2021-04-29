@component('mail::message')
# Vous avez reçu un message de la part de {{ $data['firstname'] }} {{ $data['lastname'] }} ({{ $data['email'] }}).

Contenu du message:

{{ $data['content'] }}

Thanks,<br>
{{ config('app.name') }}
@endcomponent
