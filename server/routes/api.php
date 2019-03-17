<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// units api routes
Route::get('units-list', 'UnitController@index');
Route::post('new-unit', 'UnitController@save');
Route::get('unit/{Unit_NO}', 'UnitController@view');
Route::put('unit/{Unit_No}', 'UnitController@put');
Route::delete('unit/{Unit_No}', 'UnitController@delete');


//categorys routes
Route::get('categorys-list', 'CategoryController@index');
Route::post('new-category', 'CategoryController@save');
Route::get('cat/{CAT_No}', 'CategoryController@view');
Route::put('cat/{CAT_No}', 'CategoryController@put');
Route::delete('cat/{CAT_No}', 'CategoryController@delete');


//AccDef routes
Route::get('accdef-list', 'AccDefController@index');
Route::post('new-accdef', 'AccDefController@save');
Route::get('accdef/{AccDef_No}', 'AccDefController@view');
Route::put('accdef/{AccDef_No}', 'AccDefController@put');
Route::delete('accdef/{AccDef_No}', 'AccDefController@delete');


//items routes
Route::get('items-list', 'ItemController@index');
Route::get('item/{Itm_No}', 'ItemController@view');
Route::post('new-item', 'ItemController@save');
Route::delete('item/{Itm_No}', 'ItemController@delete');