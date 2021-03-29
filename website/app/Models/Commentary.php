<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commentary extends Model
{
    use HasFactory;

    protected $table = 'commentaries';

    protected $fillable = [
        'firstname',
        'lastname',
        'content',
        'date',
        'articles_id',
    ];

    /*
    *   Relation avec la table Articles
    */

    public function article() {
        return $this->hasOne(Article::class);
    }
}
