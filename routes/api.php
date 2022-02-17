<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthUserController;
use Illuminate\Support\Facades\Auth;

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


Route::group(['middlewate' => 'api'], function(){
    Route::get('tasks','App\Http\Controllers\Api\TaskController@index');
    Route::get('tasks/today','App\Http\Controllers\Api\TaskController@TodayTodo' );
    Route::get('tasks/shikuziri','App\Http\Controllers\Api\TaskController@shikuziriTodo' );
    Route::post('task/create', 'App\Http\Controllers\Api\TaskController@create');
    Route::post('task/update_flag', 'App\Http\Controllers\Api\TaskController@toggleFlagUpdate');
    Route::post('delete', 'App\Http\Controllers\Api\TaskController@delete');
});

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


// Route::middleware('auth:api')->get('/user', function () {
//      return Auth::user();
// });




