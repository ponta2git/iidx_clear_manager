<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClearResult extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'chart_id',
        'clear_lamp_id'
    ];

    protected $visible = [
        'id',
        'chart_id',
        'clear_lamp_id',
        'created_at'
    ];

    public function user() {
        return $this->belongsTo('App\Modeks\User');
    }

    public function chart() {
        return $this->hasOne('App\Models\Chart');
    }

    public function clear_lamp() {
        return $this->hasOne('App\Models\ClearLamp');
    }
}
