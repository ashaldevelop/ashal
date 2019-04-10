<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Unit;
use App\Item;

class UnitController extends Controller{

   
    // get all units
    public function index(){
        return Unit::all();
    }


    // save single unit
    public function save(Request $request){

        $unit= new Unit;
        $unit->Arb_Des= $request->input('Arb_Des');
        $unit->Eng_Des= $request->input('Eng_Des');
         $unit->Unit_No= Unit::max('Unit_No') + 1;

         $unit->St= 0;
        
        if($unit->save()){
            return $unit;
        }
        
        // return Unit::create($request->all());
    }


    // get single unit
    public function view($id){
        return Unit::where('Unit_No', '=', $id)->firstOrFail();
    }

    
    // update single unit 
    public function put(Request $request, $id){

        $unit= Unit::where('Unit_No', '=', $id)->firstOrFail();
        $unit->update($request->all());

        return $unit;

    }

    // delete single unit
    public function delete($id){

        // check if the unit used in item
        $unitUsed = Item::where('Unit1', $id)->orWhere('Unit2', $id)->orWhere('Unit3', $id)->orWhere('Unit4', $id)->orWhere('Unit5', $id)->exists();

        if($unitUsed == false){
            $unit= Unit::where('Unit_No', '=', $id)->firstOrFail();        
            $unit->delete();
            return 204;
        }else{
            return response()->json('this unit cant be deleted, aleady used in item');
        }


    }

}
