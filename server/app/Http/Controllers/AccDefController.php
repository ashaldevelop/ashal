<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\AccDef;
use App\Http\Resources\AccDef as AccDefResource;

class AccDefController extends Controller
{
    public function index()
    {
        return response()->json(AccDefResource::collection(AccDef::orderBy('AccDef_No', 'DESC')->get()));
    }

    public function indexPublic()
    {
        return response()->json(AccDefResource::collection(AccDef::where([ ['AccCat', '=' ,'5'], ['Lev', '=' ,0]])->orderBy('AccDef_No', 'desc')->get()));
    }

    public function save(Request $request)
    {
        $AccDef= new AccDef;
        $AccDef->Arb_Des= $request->input('Arb_Des');
        $AccDef->Eng_Des= $request->input('Eng_Des');

         $AccDef->AccDef_No= AccDef::max('AccDef_No') + 1;
        // $Category->Unit_No= 5;
        $AccDef->St= 0;

        if($AccDef->save()){
            return 'success';
        }

    }

    public function delete($id)
    {   

        $AccDef_No = (int)$id;
        $AccDef = AccDef::where('AccDef_No', $AccDef_No)->first();

        if($AccDef->delete()){
            return 'success';
        }

    }

    public function viewAccDef($id)
    {   
        $AccDef = AccDef::findOrFail($id);
        return response()->json(new AccDefResource($AccDef));       
    }

    public function update(Request $request)
    {
        $AccDef_No= (int)($request->input('AccDef_No'));

        $AccDef = AccDef::where('AccDef_No', $AccDef_No)->first();


        $AccDef->Arb_Des= $request->input('Arb_Des');
        $AccDef->Eng_Des= $request->input('Eng_Des');
        
        $AccDef->St= 0;
        if($AccDef->update()){
            return 'success';
        }

    }


}
