<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Providers\RouteServiceProvider;

class LoginController extends Controller
{
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function loginForm() {
        return view('index');
    }

    public function login(Request $request) {
        $request->session()->regenerate();

        $this->validate($request, [
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);
        $credentials = $request->only(['email', 'password']);

        if (Auth::attempt($credentials, true)) {
            return redirect()->intended(RouteServiceProvider::HOME);
        } else {
            return redirect()
                ->back()
                ->withErrors(['loginerror' => 'メールアドレスまたはパスワードが正しくありません。'])
                ->withInput();
        }
    }

    public function logout() {
        Auth::logout();
        return redirect('/');
    }
}
