<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GdDetails extends Model
{
    protected $table = 'T_GDDET';
    public $timestamps = false;
    protected $primaryKey = 'GDDET_ID';
}
