<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commentaries extends Model
{
    use HasFactory;

    protected $fillable = [
        'firstname',
        'lastname',
        'content'
    ];

    /*
    *   Relation avec la table Articles
    */

    public function articles() {
        return $this->hasOne(Articles::class);
    }
}
