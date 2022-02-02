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

    // Sauvegarde l'image d'une catégorie
    public function uploadCategory(Request $request) {
        $name = $request->image->getClientOriginalName();
        $request->image->move(public_path('media/images/categories'), $name);
    }

    // Supprime l'image d'un article
    public function deleteArticle(Request $request) {
        $name = $request->name;
        $root = $_SERVER['DOCUMENT_ROOT'];
        $file = $root.'/media/images/articles/article-'.$name.'.jpg';

        if(file_exists($file)) {
            unlink($file);
        }
    }

    // Supprime l'image d'une catégorie
    public function deleteCategory(Request $request) {
        $name = $request->name;
        $root = $_SERVER['DOCUMENT_ROOT'];
        $file = $root.'/media/images/categories/category-'.$name.'.jpg';

        if(file_exists($file)) {
            unlink($file);
        }
    }
}
