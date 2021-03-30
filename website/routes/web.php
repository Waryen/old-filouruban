<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;

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
});

Route::get('admin', function() {
    return view('admin');
});

Route::get('login', function() {
    return view('login');
});

// Connexion à l'administration
Route::post('login-check', [LoginController::class, 'authenticate']);