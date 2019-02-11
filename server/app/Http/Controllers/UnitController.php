<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Unit;

class UnitController extends Controller
{
    public function index(){
        return Unit::all();
    }

    public function viewUnit($id){
        return Unit::findOrFail($id)->first();
    }

    public function save(Request $request){

        $unit= new Unit;
        $unit->Arb_Des= $request->input('Arb_Des');
        $unit->Eng_Des= $request->input('Eng_Des');
         $unit->Unit_No= Unit::max('Unit_No') + 1;
        // $unit->Unit_No= 5;
        $unit->St= 0;
        
        if($unit->save()){
            return $unit;
        }
        
        // return Unit::create($request->all());
    }
    
    public function update(Request $request, $id){

        $Unit= Unit::findOrFail($id)->first();
        $Unit->update($request->all());

        return $Unit;

    }

    public function delete(Request $request, $id){

        $Unit= Unit::findOrFail($id)->first();
        $Unit->delete();

        return 204;

    }

}
