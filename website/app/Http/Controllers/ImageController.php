<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ImageController extends Controller
{
    // Sauvegarde l'image d'un article
    public function uploadArticle(Request $request) {
        $name = $request->image->getClientOriginalName();
        $request->image->move(public_path('media/images/articles'), $name);
    }
}
