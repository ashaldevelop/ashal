<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $table = 'T_Items';
    public $timestamps = false;
    protected $primaryKey = 'Itm_No';
    // protected $forignKey = 'ItmCat';
    
    public function unit(){
        return $this->belongsTo('App\Unit', 'Unit1', 'Unit_No');
    }
    
    public function unit2(){
        return $this->belongsTo('App\Unit', 'Unit2', 'Unit_No');
    }

    public function category(){
        return $this->belongsTo('App\Category', 'ItmCat', 'CAT_No');
    }
}
