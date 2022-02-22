<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use App\Models\Chart;
use App\Models\Version;
use App\Models\Cpi;
use App\Models\Ability;
use App\Models\ClearLamp;
use App\Models\ClearResult;
use App\Models\User;
use App\Models\UserDanI;
use Auth;
use DB;

class DataController extends Controller
{
    public function clearLampDetails() {
        $userId = Auth::user()->id;

        $query = DB::table('charts');
        
        $cr_base = DB::table('clear_results as cr_base')
                    ->select([
                        'cr_base.user_id',
                        'cr_base.chart_id',
                        DB::raw('MAX(cr_base.created_at) as c_at')
                    ])
                    ->groupBy(
                        'cr_base.user_id',
                        'cr_base.chart_id'
                    )->where('cr_base.user_id', $userId);
        
        $cr = DB::table('clear_results as cr')
                    ->select([
                        'cr.user_id',
                        'cr.chart_id',
                        'cr.created_at',
                        'cr.clear_lamp_id',
                    ])
                    ->distinct()
                    ->joinSub($cr_base, '_cr', function ($join) use ($userId) {
                        $join->where('_cr.user_id', $userId)
                            ->on('_cr.user_id', '=', 'cr.user_id')
                            ->on('_cr.chart_id', '=', 'cr.chart_id')
                            ->on('_cr.c_at', '=', 'cr.created_at');
                    });
        
        $query->leftJoinSub($cr, 'mycr', function ($join) {
            $join->on('charts.id', '=', 'mycr.chart_id');
        });

        $select = [
            'mycr.clear_lamp_id as cl_id',
            DB::raw('count(*) as count')
        ];

        $query->select($select)
                ->groupBy('mycr.clear_lamp_id');
        
        return $query->get()->toJson();
    }

    public function clearResultsChanges() {
        $userId = Auth::user()->id;
        $query = DB::table('clear_results as cr')
            ->where('cr.user_id', $userId)
            ->where('cr.clear_lamp_id', '>=', 2)
            ->whereRaw("DATE_FORMAT(cr.created_at, '%Y-%m') >= DATE_FORMAT(DATE_ADD(NOW(), interval -3 month), '%Y-%m')")
            ->groupBy(DB::raw("DATE_FORMAT(cr.created_at, '%Y-%m')"))
            ->limit(3)
            ->select([
                DB::raw("DATE_FORMAT(cr.created_at, '%Y-%m') as month"),
                DB::raw("count(*) as count")
            ]);
        
        return $query->get()->toJson();
    }

    public function cpiResultsDetails() {
        $userId = Auth::user()->id;

        $query = DB::table('cpis')
                ->where('cpis.clear_lamp_id', '>=', 3)
                ->where('cpis.value', '<', 9999);

        $cr_base = DB::table('clear_results as cr_base')
                    ->select([
                        'cr_base.user_id',
                        'cr_base.chart_id',
                        DB::raw('MAX(cr_base.created_at) as c_at')
                    ])
                    ->groupBy(
                        'cr_base.user_id',
                        'cr_base.chart_id'
                    )->where('cr_base.user_id', $userId);
        
        $cr = DB::table('clear_results as cr')
                    ->select([
                        'cr.user_id',
                        'cr.chart_id',
                        'cr.created_at',
                        'cr.clear_lamp_id',
                        'cr.id'
                    ])
                    ->distinct()
                    ->joinSub($cr_base, '_cr', function ($join) use ($userId) {
                        $join->where('_cr.user_id', $userId)
                            ->on('_cr.user_id', '=', 'cr.user_id')
                            ->on('_cr.chart_id', '=', 'cr.chart_id')
                            ->on('_cr.c_at', '=', 'cr.created_at');
                    });
        
        $query->leftJoinSub($cr, 'mycr', function ($join) {
            $join->on('cpis.chart_id', '=', 'mycr.chart_id')
                ->on('cpis.clear_lamp_id', '=', 'mycr.clear_lamp_id');
        });

        $query->whereNotNull('mycr.id');

        $select = [
            'cpis.chart_id',
            'cpis.clear_lamp_id',
            'cpis.value',
            'mycr.id'
        ];

        return $query
            ->select($select)
            ->get()
            ->toJson();
    }

    public function recommendCharts() {
        $userId = Auth::user()->id;
        
        $query = DB::table('cpis')
                ->where('cpis.clear_lamp_id', '>=', 3);

        $cr_base = DB::table('clear_results as cr_base')
                    ->select([
                        'cr_base.user_id',
                        'cr_base.chart_id',
                        DB::raw('MAX(cr_base.created_at) as c_at')
                    ])
                    ->groupBy(
                        'cr_base.user_id',
                        'cr_base.chart_id'
                    )->where('cr_base.user_id', $userId);
                    
        $cr = DB::table('clear_results as cr')
                    ->select([
                        'cr.user_id',
                        'cr.chart_id',
                        'cr.created_at',
                        'cr.clear_lamp_id',
                        'cr.id'
                    ])
                    ->distinct()
                    ->joinSub($cr_base, '_cr', function ($join) use ($userId) {
                        $join->where('_cr.user_id', $userId)
                            ->on('_cr.user_id', '=', 'cr.user_id')
                            ->on('_cr.chart_id', '=', 'cr.chart_id')
                            ->on('_cr.c_at', '=', 'cr.created_at');
                    });

        $calcMyCpi = clone $query;

        $calcMyCpi->leftJoinSub($cr, 'mycr', function ($join) {
            $join->on('cpis.chart_id', '=', 'mycr.chart_id')
                ->on('cpis.clear_lamp_id', '=', 'mycr.clear_lamp_id');
        })->whereNotNull('mycr.id');

        $select = [
            'cpis.value'
        ];

        $myCpis = $calcMyCpi->select($select)
            ->orderBy('cpis.value', 'desc')
            ->get();
        
        if ($myCpis->count() === 0) {
            $myCpi = 0;
        } else {
            $myCpi = ($myCpis->toArray())[floor($myCpis->count() / 2)]->value;
        }

        /*
        $myCpi = $myCpis->reduce(function ($acc, $v) {
            return $acc + $v->value;
        }, 0) / $myCpis->count();
        */

        $fetchRecommend = clone $query;
        $fetchRecommend->leftJoinSub($cr, 'mycr', function ($join) {
            $join->on('cpis.chart_id', '=', 'mycr.chart_id')
                ->on('cpis.clear_lamp_id', '<=', 'mycr.clear_lamp_id');
        })->whereNull('mycr.id');

        $select = [
            'cpis.value as cpi',
            'charts.name as name',
            'charts.id as chart_id',
            'cpis.clear_lamp_id as goal_lamp_id',
            'mycr2.clear_lamp_id as my_lamp_id'
        ];

        $fetchRecommend
            ->orderBy(DB::raw("ABS(cpis.value - $myCpi)"), 'asc')
            ->limit(20)
            ->leftJoin('charts', function ($join) {
                $join->on('charts.id', '=', 'cpis.chart_id');
            })
            ->leftJoinSub($cr, 'mycr2', function ($join) {
                $join->on('cpis.chart_id', '=', 'mycr2.chart_id');
            })
            ->select($select);

        $result = $fetchRecommend->get();
        $result_array = $result->toArray();
        $result_count = $result->count();

        if ($result_count === 0) return json_encode($result_array);

        srand(strtotime(date('Ymd')));
        $item_count = $result_count < 5 ? $result_count : 5;
        $item_base = range(1, $item_count);

        return collect($item_base)->reduce(function ($acc, $v) use ($result_count) {
            $candidate = 0;

            do {
                $candidate = rand(0, $result_count - 1);    
            } while (
                $acc->first(function ($v, $k) use ($candidate) {
                    return $v === $candidate;
                }) !== null
            );

            return $acc->push($candidate);
        }, collect([]))
        ->map(function ($v, $k) use ($result_array) {
            return $result_array[$v];
        })->toJson();
    }

    public function danIExcerpts() {
        return UserDanI::myDanI()->first()->toJson();
    }
}
