<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClearLamp extends Model
{
    use HasFactory;

    public function clear_results() {
        return $this->belongsTo('App\Models\ClearResult');
    }
}
