<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\LogoutController;

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

Route::get('/', function() {
    return view('accueil');
})->name('accueil');

Route::get('about', function() {
    return view('about');
})->name('about');

Route::get('contact', function() {
    return view('contact');
})->name('contact');

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