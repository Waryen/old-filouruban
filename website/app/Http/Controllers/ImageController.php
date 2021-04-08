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

    // Supprime l'image d'un article
    public function deleteArticle(Request $request) {
        $name = $request->name;
        $root = $_SERVER['DOCUMENT_ROOT'];
        $file = $root.'/media/images/articles/article-'.$name.'.png';

        if(file_exists($file)) {
            unlink($file);
        }
    }
}
