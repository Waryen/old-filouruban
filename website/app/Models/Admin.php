<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Hash;
use Illuminate\Notifications\Notifiable;
use Illuminate\Auth\Passwords\CanResetPassword;

class Admin extends Authenticatable
{
    use HasFactory, Notifiable, CanResetPassword;

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
        //'password',
        //'api_token',
        'remember_token',
    ];

    /*
    *   Crypte les mots de passe
    */

    public function setPasswordAttribute($password) {
        if(trim($password) === '') {
            return;
        }

        $this->attributes['password'] = Hash::make($password);
    }

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
