<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Chart;
use App\Models\Version;
use App\Models\Cpi;
use App\Models\Ability;
use App\Models\ClearLamp;
use App\Models\ClearResult;
use App\Models\User;
use Auth;
use DB;

class ChartController extends Controller
{
 
    public function all(Request $request) {
        $subtypeToValue = function ($subtype) {
            switch ($subtype) {
                case "easy": return 3;
                case "clear": return 4;
                case "hard": return 5;
                case "exh": return 6;
                case "fc": return 7;
                default: return null;
            }
        };

        $userId = Auth::user()->id;

        $type = $request->type ?? 'ability';
        $subtype = $subtypeToValue($request->subtype ?? 'clear');
        $order = $request->order ?? 'asc';

        $select = [
            'charts.id as chart_id',
            'charts.name as chart_name',
            'chart_comments.comment as comment',
            'mycr.clear_lamp_id as clear_lamp_id',
        ];

        $query = DB::table('charts')
            ->leftJoin('chart_comments', function ($join) use ($userId) {
                $join->on('chart_comments.chart_id', '=', 'charts.id')
                    ->where('chart_comments.user_id', $userId);
            });
        
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

        switch ($type) {
            case "ability":
                $query->leftJoin('abilities', function ($join) use ($subtype) {
                    $join->on('abilities.chart_id', '=', 'charts.id')
                        ->where('abilities.clear_lamp_id', $subtype);
                });
                array_push($select, 'abilities.value as barometer');
                break;
            case "cpi":
                $query->leftJoin('cpis', function ($join)  use ($subtype) {
                    $join->on('cpis.chart_id', '=', 'charts.id')
                        ->where('cpis.clear_lamp_id', $subtype);
                });
                array_push($select, 'cpis.value as barometer');
                break;
        };

        $query->select($select);

        $query->orderBy('barometer', $order)
            ->orderBy('chart_name', 'asc');

        return $query->get()->toJson();
    }

    public function updateClear(Request $request) {
        $userId = Auth::user()->id;
        
        $myResult = new ClearResult;
        $myResult->fill([
            'user_id' => $userId,
            'chart_id' => $request->input('chart_id'),
            'clear_lamp_id' => $request->input('clear_lamp_id')
        ]);

        DB::transaction(function () use ($myResult) {
            $myResult->save();
        });
        
        return ClearResult::where('user_id', $userId)
                            ->where('chart_id', $request->input('chart_id'))
                            ->orderBy('created_at', 'desc')
                            ->get()
                            ->toJson();
    }

    public function deleteClear(Request $request) {
        $userId = Auth::user()->id;
        $cr = ClearResult::find($request->input('id'));
        $cr->delete();

        return ClearResult::where('user_id', $userId)
                            ->where('chart_id', $request->input('chart_id'))
                            ->orderBy('created_at', 'desc')
                            ->get()
                            ->toJson();
    }

    public function detail(Request $request) {
        $chart = Chart::find($request->input('chart_id'));
        $version = Version::where('value', $chart->version)->first();
        $cpis = Cpi::where('chart_id', $request->input('chart_id'))
                    ->orderBy('clear_lamp_id')
                    ->get();
        $abilities = Ability::where('chart_id', $request->input('chart_id'))
                            ->orderBy('clear_lamp_id')
                            ->get();
        $clearResults = ClearResult::where('user_id', Auth::user()->id)
                                    ->where('chart_id', $request->input('chart_id'))
                                    ->orderBy('created_at', 'desc')
                                    ->get();
        
        $data = [
            "chart_id" => $request->input('chart_id'),
            "name" => $chart->name,
            "version" => $version->name,
            "abilities" => $abilities,
            "cpis" => $cpis,
            "clear_results" => $clearResults
        ];
        
        return json_encode($data);
    }

    public function getSettings() {
        return User::query()
            ->select ([
                'users.close_after_set_result as close_after_set_result',
                'users.sort_type as sort_type',
                'users.sub_sort_type as sub_sort_type',
                'users.sort_order as sort_order',
                'users.filters as filters',
            ])
            ->where('users.id', Auth::user()->id)
            ->get()->toJson();
    }

    public function setSettings(Request $request) {
        $user = Auth::user();
        $user->fill($request->all());
        $user->save();
    }
}
