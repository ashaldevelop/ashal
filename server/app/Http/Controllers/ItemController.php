<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Item;
use App\Http\Resources\Item as ItemResource;
class ItemController extends Controller
{
    public function index()
    {
        return response()->json(ItemResource::collection(Item::orderBy('Itm_No', 'DESC')->get()));
    }
}
