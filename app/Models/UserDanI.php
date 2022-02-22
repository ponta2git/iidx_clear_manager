<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Auth;
use DB;

class UserDanI extends Model
{
    use HasFactory;

    protected $table = 'user_dan_i';

    protected $fillable = [
        'user_id',
        'dan_i_id'
    ];

    public function scopeMyDanI($query) {
        return $query->where('user_id', Auth::user()->id)
                    ->where('created_at', function ($query) {
                        $query->select([DB::raw('MAX(created_at)')])
                            ->from('user_dan_i')
                            ->where('user_id', Auth::user()->id);
                    })
                    ->select([
                        'dan_i_id as dan_i',
                        'created_at as created_at'
                    ]);
    }
}
