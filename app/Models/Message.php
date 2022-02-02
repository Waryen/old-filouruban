<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $table = 'messages';

    protected $fillable = [
        'title',
        'content',
        'active',
        'admins_id',
    ];

    /*
    *   Relation avec la table Admins
    */

    public function admin() {
        return $this->hasOne(Admin::class);
    }
}
