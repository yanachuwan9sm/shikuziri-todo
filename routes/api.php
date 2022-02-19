<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthUserController;
use Illuminate\Support\Facades\Auth;
use App\Models\Task;

Route::group(['middlewate' => 'api'], function(){
    Route::get('tasks','App\Http\Controllers\Api\TaskController@index');
    Route::get('tasks/shikuziri','App\Http\Controllers\Api\TaskController@shikuziriTodo' );
    Route::post('task/create', 'App\Http\Controllers\Api\TaskController@create');
    Route::post('task/update_flag', 'App\Http\Controllers\Api\TaskController@toggleFlagUpdate');
    Route::post('delete', 'App\Http\Controllers\Api\TaskController@delete');
    Route::post('/logout', [App\Http\Controllers\Auth\LoginController::class, 'logout']);
});

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum'])->get('/tasks/today', function (Request $request) {
       $tasks = Task::WhereDate('created_at', date("Y-m-d") )->where('user_id', $request->user()->id)->orderBy('created_at', 'asc')->get();
        return response()->json($tasks,200);
});





