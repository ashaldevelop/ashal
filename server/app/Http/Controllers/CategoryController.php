<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Category;
use App\Unit;
use App\Http\Resources\Category as CategoryResource;

class CategoryController extends Controller{
    

    // get all categorys
    public function index(){
        return response()->json(CategoryResource::collection(Category::orderBy('CAT_No', 'DESC')->get()));
    }


    // save new category
    public function save(Request $request){
        $category= new Category;
        $category->Arb_Des= $request->input('Arb_Des');
        $category->Eng_Des= $request->input('Eng_Des');

         $category->CAT_No= Category::max('CAT_No') + 1;
        // $Category->Unit_No= 5;
        $category->St= 0;

        if($category->save()){
            return $category;
        }

    }


    // get single category
    public function view($id)
    {   
        return Category::where('CAT_No', '=', $id)->firstOrFail();
    }


    // update single category
    public function put(Request $request, $id)
    {

        $category = Category::where('CAT_No', $id)->first();

        $category->Arb_Des= $request->input('Arb_Des');
        $category->Eng_Des= $request->input('Eng_Des');
        
        $category->St= 0;
        if($category->update()){
            return $category;
        }

    }

    // delete single category
    public function delete($id){   
        $category= Category::where('CAT_No', '=', $id)->firstOrFail();
        if($category->delete()){
            return 204;
        }

    }

}
