<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    use HasFactory;

    protected $table = 'admins';

    protected $fillable = [
        'firstname',
        'lastname',
        'email',
        'password',
        'su',
        'api_token',
        'remember_token',
    ];

    protected $hidden = [
        'password',
        'api_token',
        'remember_token',
    ];

    /*
    *   Relations avec les tables Articles et Messages
    */

    public function article()
    {
        return $this->hasMany(Article::class);
    }

    public function message() {
        return $this->hasMany(Message::class);
    }
}
