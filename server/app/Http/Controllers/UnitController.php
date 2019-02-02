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
        return Unit::create($request->all());
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
