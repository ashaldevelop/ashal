<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AccDef extends JsonResource
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
            // 'id' => $this->id,
            'AccDef_No' => $this->AccDef_No,
            'Arb_Des' => $this->Arb_Des,
            'Eng_Des' => $this->Eng_Des,
            // 'created_at' => (string) $this->created_at,
        ];

    }
}
