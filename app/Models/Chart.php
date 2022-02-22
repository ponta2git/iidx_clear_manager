<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chart extends Model
{
    use HasFactory;

    public function version() {
        return $this->belongsTo('App\Models\Version');
    }

    public function ability() {
        return $this->hasOne('App\Models\Ability');
    }

    public function cpi() {
        return $this->hasOne('App\Models\Cpi');
    }

    public function clear_results() {
        return $this->belongsTo('App\Models\ClearResult');
    }

    public function chart_comments() {
        return $this->belongsTo('App\Models\ChartComment');
    }
}
