<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $table = 'articles';

    protected $fillable = [
        'name',
        'description',
        'categories_id',
        'admins_id',
    ];

    /*
    *   Relations avec les tables Admins, Categories et Commentaries
    */

    public function admin() {
        return $this->hasOne(Admin::class);
    }

    public function category() {
        return $this->hasOne(Categorie::class);
    }

    public function commentary() {
        return $this->hasMany(Commentarie::class);
    }
}
