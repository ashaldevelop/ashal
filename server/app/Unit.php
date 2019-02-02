<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Unit extends Model
{
    protected $table = 'T_Unit';
    public $timestamps = false;
    protected $primaryKey = 'Unit_No';
    protected $fillable = ['St', 'Unit_Id', 'Arb_Des', 'Eng_Des'];
}