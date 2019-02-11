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
Route::get('unit/{Unit_NO}', 'UnitController@viewUnit');
Route::post('new-unit', 'UnitController@save');
Route::delete('unit/{Unit_No}', 'UnitController@delete');
Route::put('update-unit/{Unit_No}', 'UnitController@update');

//items routes
Route::get('items-list', 'ItemController@index');

//category routes
Route::get('categorys-list', 'CategoryController@index');
Route::post('new-category', 'CategoryController@save');
