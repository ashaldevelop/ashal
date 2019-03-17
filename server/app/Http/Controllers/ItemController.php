<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Item;
use App\Http\Resources\Item as ItemResource;
class ItemController extends Controller{

    
    // get all items
    public function index(){
        return response()->json(ItemResource::collection(Item::orderBy('Itm_No', 'DESC')->get()));
    }


    // save single item
    public function save(Request $request){

        $item= new Item;
        $item->Itm_No= $request->input('Itm_No');
        $item->ItmCat= $request->input('ItmCat');
        $item->Eng_Des= $request->input('Eng_Des');
        $item->Arb_Des= $request->input('Arb_Des');
        $item->OpenQty= $request->input('OpenQty');
        $item->DefultVendor= $request->input('DefultVendor'); // accdef no
        $item->StartCost= $request->input('StartCost'); // open cost
        $item->LastCost= $request->input('LastCost');
        $item->QtyMax= $request->input('QtyMax'); // max qty
        $item->ItmTyp= $request->input('ItmTyp');
        
        

        // unit 1
        $item->Unit1= $request->input('Unit1');
        $item->Pack1= $request->input('Pack1');
        $item->UntPri1= $request->input('UntPri1');

        // unit 2
        $item->Unit2= $request->input('Unit2');
        $item->Pack2= $request->input('Pack2');
        $item->UntPri2= $request->input('UntPri2');

        // unit 3
        $item->Unit3= $request->input('Unit3');
        $item->Pack3= $request->input('Pack3');
        $item->UntPri3= $request->input('UntPri3');

        // unit 4
        $item->Unit4= $request->input('Unit4');
        $item->Pack4= $request->input('Pack4');
        $item->UntPri4= $request->input('UntPri4');

        // unit 5
        $item->Unit5= $request->input('Unit5');
        $item->Pack5= $request->input('Pack5');
        $item->UntPri5= $request->input('UntPri5');


        if($item->save()){
            return $item;
        }
        
    }

    
    // get single item
    public function view($id){
        return Item::where('Itm_No', '=', $id)->firstOrFail();
    }


    // delete single item
    public function delete($id){

        $unit= Item::where('Itm_No', '=', $id)->firstOrFail();
        $unit->delete();

        return 204;

    }

}
