<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
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
    return view('article', ['article' => $article, 'category' => $category]);
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




// Password reset
Route::get('/forgot-password', function () {
    return view('forgot-password');
})->middleware('guest')->name('password.request');

Route::post('/forgot-password', function (Request $request) {
    $request->validate(['email' => 'required|email']);

    $status = Password::sendResetLink(
        $request->only('email')
    );

    return $status === Password::RESET_LINK_SENT
                ? back()->with(['status' => __($status)])
                : back()->withErrors(['email' => __($status)]);
})->middleware('guest')->name('password.email');

Route::get('/reset-password/{token}', function ($token) {
    return view('reset-password', ['token' => $token]);
})->middleware('guest')->name('password.reset');

Route::post('/reset-password', function (Request $request) {
    $request->validate([
        'token' => 'required',
        'email' => 'required|email',
        'password' => 'required|confirmed',
    ]);

    $status = Password::reset(
        $request->only('email', 'password', 'password_confirmation', 'token'),
        function ($user, $password) use ($request) {
            $user->forceFill([
                'password' => Hash::make($password)
            ])->setRememberToken(Str::random(60));

            $user->save();

            event(new PasswordReset($user));
        }
    );

    return $status == Password::PASSWORD_RESET
                ? redirect()->route('login')->with('status', __($status))
                : back()->withErrors(['email' => [__($status)]]);
})->middleware('guest')->name('password.update');