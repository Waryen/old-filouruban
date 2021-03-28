<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Messages extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content'
    ];

    /*
    *   Relation avec la table Admins
    */

    public function admins() {
        return $this->hasOne(Admins::class);
    }
}
