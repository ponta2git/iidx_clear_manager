<?php

namespace App\Http\ViewComposers;

use Auth;
use Illuminate\View\View;

class LayoutComposer {
    public function compose(View $view) {
        $view->with([
            'loginUser' => Auth::user(),
        ]);
    }
}

