<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\AccDef;
use App\INVHED;
use App\INVDET;

class InvoiceController extends Controller{


    public function preInvoice(){
        $preInvoice = (object) [
            'currencys' => DB::table('T_Curency')->select('Curency_ID', 'Arb_Des', 'Eng_Des')->get(),
            'mndobs' => DB::table('T_Mndob')->select('Mnd_No', 'Arb_Des', 'Eng_Des')->where('St', 0)->get(),
            'csts' => DB::table('T_CstTbl')->select('Cst_No', 'Arb_Des', 'Eng_Des')->where('St', 0)->get(),
            'accdefs' => AccDef::select('AccDef_No', 'Arb_Des', 'Eng_Des')->where('Lev', 0)->where('AccCat', 4)->get(),
            'cashAccdefs' => AccDef::select('AccDef_No', 'Arb_Des', 'Eng_Des')->where('Lev', 0)->where('AccCat', 2)->get(),
            'stores' => DB::table('T_Store')->select('Store_No')->get(),
            'items' => DB::table('T_Items')->where('ItmTyp', '!=' , 5)->get()
        ];
        return response()->json($preInvoice);
    }

    public function getInvoice(){
        $id = $_GET['id'];

        if($id==0){
            $invoice = (object) [
                'INVHED' => INVHED::select('InvHed_ID', 'InvNo')->latest('InvHed_ID')->first()
            ];
        }
        else{
            $invoice = (object) [
                'INVHED' =>  INVHED::where('InvHed_ID', '=', $id)->firstOrFail(),
                'INVDET' =>  INVDET::where('InvId', '=', $id)->get()
            ];
        }

        return response()->json($invoice);

    }

    public function getItemData(){
        $Itm_No = $_GET['Itm_No'];
        $itemUnitsArray = [];
        for($i=1; $i<=5; $i++){
            $unit = 'Unit' . strval($i);
            $Unit_No = DB::table("T_Items")->where('Itm_No', $Itm_No)->first()->$unit;

            if($Unit_No != 0){
                array_push($itemUnitsArray, DB::table('T_Unit')->select('Arb_Des', 'Eng_Des', 'Unit_No')->where('Unit_No', $Unit_No)->get());
            }
        }

        $itemUnits = [];
        foreach($itemUnitsArray as $index => $unitArray){
            foreach($unitArray as $key => $value){
                array_push($itemUnits, $value);
            }    
        }

        $itemDetails = (object) [

            'arbDesc' =>  DB::table("T_Items")->where('Itm_No', $Itm_No)->first()->Arb_Des,
            'engDesc' =>  DB::table("T_Items")->where('Itm_No', $Itm_No)->first()->Eng_Des,
            'units' =>  $itemUnits,
            'defaultUnit' =>  DB::table("T_Items")->where('Itm_No', $Itm_No)->first()->DefultUnit

        ];
        return response()->json($itemDetails);
    }


}