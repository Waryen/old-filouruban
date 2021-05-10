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
        $token = $request->captcha;

        $hcaptcha = array(
            'secret' => "0x1b2E78d844DBE0217E97e14baF1C851DD3C310e6",
            'response' => $token
        );

        // Vérifie le captcha
        $verify = curl_init();
        curl_setopt($verify, CURLOPT_URL, "https://hcaptcha.com/siteverify");
        curl_setopt($verify, CURLOPT_POST, true);
        curl_setopt($verify, CURLOPT_POSTFIELDS, http_build_query($hcaptcha));
        curl_setopt($verify, CURLOPT_RETURNTRANSFER, true);
        $result = curl_exec($verify);
        $resultData = json_decode($result);

        if($resultData->success) {
            if(Auth::attempt(['email' => $email, 'password' => $password], $remember)) {
                $request->session()->regenerate();
                return 'ok';
            } else {
                return 'error';
            }
        } 
        else {
            return false;
        }
    }
}
