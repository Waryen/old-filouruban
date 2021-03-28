<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Articles extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description'
    ];

    /*
    *   Relations avec les tables Admins, Categories et Commentaries
    */

    public function admins() {
        return $this->hasOne(Admins::class);
    }

    public function categories() {
        return $this->hasOne(Categories::class);
    }

    public function commentaries() {
        return $this->hasMany(Commentaries::class);
    }
}
