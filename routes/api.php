<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WisataController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('wisata', 'App\Http\Controllers\WisataController@index');
Route::get('wisata/{wisata}','App\Http\Controllers\WisataController@show');
Route::post('wisata','App\Http\Controllers\WisataController@store');
Route::put('wisata/{wisata}','App\Http\Controllers\WisataController@update');
Route::delete('wisata/{wisata}','App\Http\Controllers\WisataController@destroy');