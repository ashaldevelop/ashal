<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\GdHead;
use App\GdDetails;
use App\AccDef;
use Illuminate\Support\Facades\DB;


class VoucherController extends Controller{

    public function preVoucher(){
        $preVoucher = (object) [
            'currencys' => DB::table('T_Curency')->select('Curency_ID', 'Arb_Des', 'Eng_Des')->get(),
            'mndobs' => DB::table('T_Mndob')->select('Mnd_No', 'Arb_Des', 'Eng_Des')->where('St', 0)->get(),
            'csts' => DB::table('T_CstTbl')->select('Cst_No', 'Arb_Des', 'Eng_Des')->where('St', 0)->get(),
            'accdefs' => AccDef::select('AccDef_No', 'Arb_Des', 'Eng_Des')->where('Lev', 0)->get()
        ];
        return response()->json($preVoucher);
    }

    public function getVoucher(){
        $id = $_GET['id'];

        if($id==0){
            $voucher = (object) [
                'GdHead' => GdHead::select('gdhead_ID', 'gdNo')->latest('gdhead_ID')->first()
            ];
        }
        else{
            $voucher = (object) [
                'GdHead' =>  GdHead::where('gdhead_ID', '=', $id)->firstOrFail(),
                'GdDetails' =>  GdDetails::where('gdID', '=', $id)->get()
            ];
        }

        return response()->json($voucher);

    }

    public function sumActiveAccdef(){
        $accdefNo = $_GET['accdefNo'];

        $balance = DB::table('T_GDDET')
        ->leftJoin('T_GDHEAD', 'T_GDDET.gdID', '=', 'T_GDHEAD.gdhead_ID')->where([ ['T_GDDET.AccNo', '=' ,$accdefNo],  ['T_GDHEAD.gdLok', '=' ,0]])
        ->sum('gdValue');

        return $balance;

    }

    public function checkGdNo(){
        $gdNo = $_GET['gdNo'];
        if(GdHead::where('gdNo', $gdNo)->exists()){
            return response()->json('this code no alraedy exist');
        }
    }

    public function accdefBalance(){
        GdDetails::select('gdValue')->where('gdTyp', 11)->pluck('gdNo')->toArray();
    }

    public function save(Request $request)  {

         $gdHead = new GdHead;
         $gdHead->gdTyp= 11;
         $gdHead->gdGDate= $request->gdGDate;

         $gdHead->CurTyp= $request->CurTyp;
         $gdHead->Rate =  (float)DB::table("T_Curency")->where('Curency_No', $request->CurTyp)->first()->Rate;

         $gdHead->gdMnd= $request->gdMnd;
         $gdHead->RefNo= $request->RefNo;
         $gdHead->gdLok= 0;
         $gdHead->gdMem= $request->gdMem;
         $gdHead->gdTot= $request->madeenTotal;
         $gdHead->Rend_Id= GdHead::max('Rend_Id') + 1;


         // get string values array of gdNo column where gdTyp = 11, then convert the array values to int and get the max then add 1
         // if gdNo column array length = 0, then gdNo = 1
         $gdNoString= GdHead::where('gdTyp', 11)->pluck('gdNo')->toArray();
         if(count($gdNoString) == 0){
             $gdHead->gdNo = 1;
         }
         else{
             $gdNoInt = array_map('intval', $gdNoString);
             $gdNoMax = max($gdNoInt);
    
             $gdHead->gdNo = $gdNoMax + 1;
         }
            
         if($gdHead->save()){
             $i = 1;
             // save voucher details table
             foreach($request->details as $data){
                
                 $gdDetails = new GdDetails;
                 $gdDetails->gdID = $gdHead->gdhead_ID;
                 $gdDetails->gdNo = $gdHead->gdNo;
                 $gdDetails->Lin = $i++;
                 $gdDetails->AccNo = $data['AccNo'];
                 $gdDetails->gdDes = $data['gdDes'];
                 $gdDetails->gdCstNo = $data['gdCstNo'];

                 $gdDetails->gdValue = $data['madeen'] > $data['daen'] ? max($data['madeen'], $data['daen']) : -(max($data['madeen'], $data['daen']));

                 $gdDetails->save();

             }
             return $gdHead->gdhead_ID;
         }
        
    }

}