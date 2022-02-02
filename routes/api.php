<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Controllers
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentaryController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\SubscriberController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Routes des Controllers
Route::middleware(['auth:api'])->group(function () {
    Route::apiResource('admin', AdminController::class);
    Route::apiResource('article', ArticleController::class);
    Route::apiResource('category', CategoryController::class);
    Route::apiResource('commentary', CommentaryController::class);
    Route::apiResource('contact', ContactController::class);
    Route::apiResource('message', MessageController::class);
    Route::apiResource('subscriber', SubscriberController::class);
});