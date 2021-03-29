<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'start_date',
        'end_date',
        'admins_id',
    ];

    /*
    *   Relation avec la table Admins
    */

    public function admin() {
        return $this->hasOne(Admin::class);
    }
}
