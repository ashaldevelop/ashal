<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Unit;
use App\Http\Resources\Unit as UnitResource;
use Illuminate\Support\Facades\DB;
class Item extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
    
        // return parent::toArray($request);
        return [
            'Item_No' => $this->Item_No,
            'Arb_Des' => $this->Arb_Des,
            'Eng_Des' => $this->Eng_Des,

            'ItemCatEng_Des' => $this->category->Eng_Des,
            'ItemCatArb_Des' => $this->category->Arb_Des,

            'Unit1_Eng_Des' => $this->unit->Eng_Des,
            'Unit1_Arb_Des' => $this->unit->Arb_Des,
            'Unit2_Eng_Des' => DB::table('T_Unit')->where('Unit_No', $this->Unit2)->value('Eng_Des'),
            'Unit2_Arb_Des' => DB::table('T_Unit')->where('Unit_No', $this->Unit2)->value('Arb_Des'),

            'Unit3_Eng_Des' => DB::table('T_Unit')->where('Unit_No', $this->Unit3)->value('Eng_Des'),
            'Unit3_Arb_Des' => DB::table('T_Unit')->where('Unit_No', $this->Unit3)->value('Arb_Des'),

            'Unit4_Eng_Des' => DB::table('T_Unit')->where('Unit_No', $this->Unit4)->value('Eng_Des'),
            'Unit4_Arb_Des' => DB::table('T_Unit')->where('Unit_No', $this->Unit4)->value('Arb_Des'),

            'Unit5_Eng_Des' => DB::table('T_Unit')->where('Unit_No', $this->Unit5)->value('Eng_Des'),
            'Unit5_Arb_Des' => DB::table('T_Unit')->where('Unit_No', $this->Unit5)->value('Arb_Des')
        ];

    }
}
