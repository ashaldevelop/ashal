<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Item;
use App\Unit;
use App\Category;
use App\AccDef;
use App\Http\Resources\Item as ItemResource;
class ItemController extends Controller{

    
    // get all items
    public function index(){
        return response()->json(ItemResource::collection(Item::orderBy('Itm_No', 'DESC')->get()));
    }

    public function preItem(){
        $preItem = (object) [
            'accdefs' => AccDef::select('AccDef_No', 'Arb_Des', 'Eng_Des')->where([ ['Lev', 0], ['AccCat', 5] ])->get(),
            'categorys' => Category::select('CAT_No', 'Arb_Des', 'Eng_Des')->get(),
            'units' => Unit::select('Unit_No', 'Arb_Des', 'Eng_Des')->get()
        ];
        return response()->json($preItem);
    }

    public function getItem(){
        $id = $_GET['id'];
            $item = Item::where('Itm_No', '=', $id)->firstOrFail();
            return response()->json($item);
    }

    // save single item
    public function save(Request $request){

        // $item= new Item;
        if($request->update == 'true'){
            $item = Item::where('Itm_No', '=', $request->Itm_No)->firstOrFail();
        }else{
            $item = new Item;
        }
        
        $item->Group_Code= $request->input('Group_Code');
        $item->ItmCat= $request->input('ItmCat');
        $item->Eng_Des= $request->input('Eng_Des');
        $item->Arb_Des= $request->input('Arb_Des');
        $item->OpenQty= $request->input('OpenQty');
        $item->LrnExp= $request->input('LrnExp');
        $item->DMY= $request->input('DMY');
        $item->DefultVendor= $request->input('DefultVendor'); // accdef no
        $item->StartCost= $request->input('StartCost'); // open cost
        $item->LastCost= $request->input('LastCost');
        $item->QtyMax= $request->input('QtyMax'); // max qty
        $item->ItmTyp= $request->input('ItmTyp');
        $item->AvrageCost= $request->input('AvrageCost');
        $item->QtyLvl= $request->input('QtyLvl');
        $item->ItmLoc= $request->input('ItmLoc');
        $item->Shipping_Cost= $request->input('Shipping_Cost');
        $item->SeaCost= $request->input('SeaCost');
        $item->Note= $request->input('Note');
        $item->ItmNature= $request->input('ItmNature');
        $item->Tax= $request->input('Tax');
        $item->ItmPOS= $request->input('ItmPOS');
    
        // *****  Start Fathi_17/03/2019   *****
        //Prices
        $item->Price1= $request->input('Price1');
        $item->Price2= $request->input('Price2');
        $item->Price3= $request->input('Price3');
        $item->Price4= $request->input('Price4');
        $item->Price5= $request->input('Price5');
        $item->Price6= $request->input('Price6');
        //Barcodes
        $item->BarCod1= $request->input('BarCod1');
        $item->BarCod2= $request->input('BarCod2');
        $item->BarCod3= $request->input('BarCod3');
        $item->BarCod4= $request->input('BarCod4');
        $item->BarCod5= $request->input('BarCod5');
        // *******  End Fathi_17/03/2019   ******
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


        if($item->update()){
            return $item;
        }
        
    }

    

    // delete single item
    public function delete($id){

        $unit= Item::where('Itm_No', '=', $id)->firstOrFail();
        $unit->delete();

        return 204;

    }

}
