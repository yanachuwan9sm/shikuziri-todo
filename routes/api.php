<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthUserController;

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

Route::group(['middlewate' => 'api'], function(){
    Route::get('tasks','App\Http\Controllers\Api\TaskController@index');
    Route::get('tasks/today','App\Http\Controllers\Api\TaskController@TodayTodo' );
    Route::post('task/create', 'App\Http\Controllers\Api\TaskController@create');
    Route::post('task/update_flag', 'App\Http\Controllers\Api\TaskController@toggleFlagUpdate');
    Route::post('delete', 'App\Http\Controllers\Api\TaskController@delete');
});

