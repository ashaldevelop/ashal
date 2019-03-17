<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\AccDef;
use App\Http\Resources\AccDef as AccDefResource;

class AccDefController extends Controller{

    // public function indexPublic(){
    //     return response()->json(AccDefResource::collection(AccDef::where([ ['AccCat', '=' ,'5'], ['Lev', '=' ,0]])->orderBy('AccDef_No', 'desc')->get()));
    // }
    
    // get all accdef
    public function index(){
        return response()->json(AccDefResource::collection(AccDef::orderBy('AccDef_No', 'DESC')->get()));
    }


    // save single accdef
    public function save(Request $request){

        $AccDef= new AccDef;
        $AccDef->Arb_Des= $request->input('Arb_Des');
        $AccDef->Eng_Des= $request->input('Eng_Des');
         $AccDef->AccDef_No= AccDef::max('AccDef_No') + 1;

        $AccDef->St= 0;

        if($AccDef->save()){
            return $AccDef;
        }

    }

    
    // get single accdef
    public function view($id){   
        $AccDef = AccDef::findOrFail($id);
        return response()->json(new AccDefResource($AccDef));   
    }


    // update single accdef
    public function put(Request $request, $id){


        $AccDef= AccDef::where('AccDef_No', '=', $id)->firstOrFail();

        $AccDef->Arb_Des= $request->input('Arb_Des');
        $AccDef->Eng_Des= $request->input('Eng_Des');
        
        $AccDef->St= 0;

        if($AccDef->update()){
            return $AccDef;
        }

    }


    // delete single accdef
    public function delete($id){   

        $AccDef= AccDef::where('AccDef_No', '=', $id)->firstOrFail();

        if($AccDef->delete()){
            return 204;
        }

    }


}
