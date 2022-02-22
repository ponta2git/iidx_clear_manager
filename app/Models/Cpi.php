<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cpi extends Model
{
    use HasFactory;

    public function chart() {
        return $this->belongsTo('App\Models\Chart');
    }

    public function clear_lamp() {
        return $this->belongsTo('App\Models\ClearLamp');
    }
}
