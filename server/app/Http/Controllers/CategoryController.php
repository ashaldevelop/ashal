<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Category;
use App\Http\Resources\Category as CategoryResource;

class CategoryController extends Controller
{
    public function index()
    {
        return response()->json(CategoryResource::collection(Category::orderBy('CAT_No', 'DESC')->get()));
    }

    public function save(Request $request)
    {
        $Category= new Category;
        $Category->Arb_Des= $request->input('Arb_Des');
        $Category->Eng_Des= $request->input('Eng_Des');

         $Category->Cat_No= Unit::max('Cat_No') + 1;
        // $Category->Unit_No= 5;
        $Category->St= 0;

        if($Category->save()){
            return 'success';
        }

    }

    public function delete($id)
    {   

        $Cat_No = (int)$id;
        $Category = Category::where('Cat_No', $Cat_No)->first();

        if($Category->delete()){
            return 'success';
        }

    }

    public function viewCategory($id)
    {   
        $Category = Category::findOrFail($id);
        return response()->json(new CategoryResource($Category));       
    }

    public function update(Request $request)
    {
        $Cat_No= (int)($request->input('Cat_No'));

        $Category = Category::where('Cat_No', $Cat_No)->first();


        $Category->Arb_Des= $request->input('Arb_Des');
        $Category->Eng_Des= $request->input('Eng_Des');
        
        $Category->St= 0;
        if($Category->update()){
            return 'success';
        }

    }


}
