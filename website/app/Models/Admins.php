<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Admins extends Model
{
    use HasFactory;

    protected $fillable = [
        'firstname',
        'lastname',
        'email',
        'password'
    ];

    /*
    *   Relations avec les tables Articles et Messages
    */

    public function articles()
    {
        return $this->hasMany(Articles::class);
    }

    public function messages() {
        return $this->hasMany(Messages::class);
    }
}
