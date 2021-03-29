<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description'
    ];

    /*
    *   Relation avec la table Articles
    */

    public function article() {
        return $this->hasMany(Article::class);
    }
}
