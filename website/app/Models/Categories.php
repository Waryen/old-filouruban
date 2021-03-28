<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categories extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description'
    ];

    /*
    *   Relation avec la table Articles
    */

    public function articles() {
        return $this->hasMany(Articles::class);
    }
}
