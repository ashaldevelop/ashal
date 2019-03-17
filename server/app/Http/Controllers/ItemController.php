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
        $item->Unit1= $request->input('Unit1');
        $item->Pack1= $request->input('Pack1');
        $item->UntPri1= $request->input('UntPri1');
          
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
