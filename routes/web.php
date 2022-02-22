<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\Api\ChartController;
use App\Http\Controllers\Api\DataController;
use App\Http\Controllers\ScoreRegisterController;
use App\Http\Controllers\StatisticsController;
use App\Http\Controllers\SettingController;


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

Route::get('/', [LoginController::class, 'loginForm'])->name('login_form');
Route::post('/', [LoginController::class, 'login'])->name('login');


Route::middleware(['auth'])->group(function () {
    Route::get('/scores', [ScoreRegisterController::class, 'index'])->name('scores');
    Route::get('/statistics', [StatisticsController::class, 'index'])->name('statistics');
    Route::get('/setting', [SettingController::class, 'index'])->name('setting');
    Route::post('/setting', [SettingController::class, 'update'])->name('update_setting');

    Route::get('/logout', [LoginController::class, 'logout'])->name('logout');

    Route::prefix('api')->middleware(['enforcejson'])->group(function () {
        Route::get('/charts', [ChartController::class, 'all'])->name('charts.all');
        Route::get('/chart', [ChartController::class, 'detail'])->name('chart.detail');
        Route::post('/clear', [ChartController::class, 'updateClear'])->name('chart.clear.update');
        Route::post('/clear/delete', [ChartController::class, 'deleteClear'])->name('chart.clear.delete');
        Route::get('/clear/settings', [ChartController::class, 'getSettings'])->name('charts.settings');
        Route::post('/clear/settings', [ChartController::class, 'setSettings'])->name('charts.settings.update');

        Route::get('/stats/clearlampdetails', [DataController::class, 'clearLampDetails'])->name('stats.clearlampdetails');
        Route::get('/stats/clearresultschanges', [DataController::class, 'clearResultsChanges'])->name('stats.clearresultchanges');
        Route::get('/stats/cpiresultsdetails', [DataController::class, 'cpiResultsDetails'])->name('stats.cpiresultsdetails');
        Route::get('/stats/recommendcharts', [DataController::class, 'recommendCharts'])->name('stats.recommendcharts');
        Route::get('/stats/daniexcerpts', [DataController::class, 'danIExcerpts'])->name('stats.daniexcerpts');
    });
});
