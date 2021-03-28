<?php

use Illuminate\Support\Facades\Route;
// Controllers Admin
use App\Http\Controllers\AdminsController;
use App\Http\Controllers\ArticlesController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\CommentariesController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\MessagesController;
use App\Http\Controllers\SubscribersController;
// Controllers Public
use App\Http\Controllers\public\AdminsPublicController;
use App\Http\Controllers\public\ArticlesPublicController;
use App\Http\Controllers\public\CategoriesPublicController;
use App\Http\Controllers\public\CommentairesPublicController;
use App\Http\Controllers\public\ContactPublicController;
use App\Http\Controllers\public\MessagesPublicController;
use App\Http\Controllers\public\SubscribersPublicController;

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

Route::get('/', function () {
    return view('welcome');
});