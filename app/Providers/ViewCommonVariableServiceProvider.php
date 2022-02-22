<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use View;
use App\Http\ViewComposers\LayoutComposer;

class ViewCommonVariableServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        View::composers([
            LayoutComposer::class => '*',
        ]);
    }
}
