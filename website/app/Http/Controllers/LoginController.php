<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /**
     * Handle an authentication attempt.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function authenticate(Request $request)
    {
        $email = $request->email;
        $password = $request->password;
        $remember = $request->remember;
        
        if(Auth::attempt(['email' => $email, 'password' => $password], $remember)) {
            $request->session()->regenerate();
            return 'ok';
        } else {
            return 'error';
        }
    }
}
