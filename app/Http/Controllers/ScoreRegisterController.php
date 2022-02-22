<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ScoreRegisterController extends Controller
{
    public function index() {
        return view('scores');
    }

    public function invalid() {
        return redirect('/scores');
    }
}
