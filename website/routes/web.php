<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\LogoutController;
use App\Http\Controllers\ImageController;
use App\Models\Category;
use App\Models\Article;
use App\Mail\ContactMail;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('email', function() {
    return new ContactMail();
});

// Public
Route::get('/', function() {
    return view('accueil');
})->name('accueil');

Route::get('search', function() {
    return view('search');
})->name('search');

Route::get('articles', function() {
    return view('categories');
})->name('categories');

Route::get('articles/{category}', function(Category $category) {
    return view('cat-arts', ['category' => $category]);
})->name('cat-arts');

Route::get('articles/{category}/{article}', function(Category $category, Article $article) {
    return view('article', ['article' => $article]);
})->name('article');

Route::get('about', function() {
    return view('about');
})->name('about');

Route::get('contact', function() {
    return view('contact');
})->name('contact');

Route::get('legal', function() {
    return view('legal');
})->name('legal');

// Images
Route::post('uploadArticleImage', [ImageController::class, 'uploadArticle']);
Route::post('uploadCategoryImage', [ImageController::class, 'uploadCategory']);
Route::post('deleteArticleImage', [ImageController::class, 'deleteArticle']);
Route::post('deleteCategoryImage', [ImageController::class, 'deleteCategory']);

// Admin
Route::get('admin', function() {
    return view('admin');
})->middleware(['auth'])->name('admin');

Route::get('login', function() {
    if(Auth::check()) {
        return redirect()->route('admin');
    }
    return view('login');
})->name('login');

// Administration
Route::post('login-check', [LoginController::class, 'authenticate']);
Route::post('logout', [LogoutController::class, 'logout']);