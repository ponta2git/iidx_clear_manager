<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ability extends Model
{
    use HasFactory;

    public function charts() {
        return $this->belongsTo('App\Models\Chart');
    }

    public function clear_lamp() {
        return $this->belongsTo('App\Models\ClearLamp');
    }
}
