<?php

use Illuminate\Support\Facades\Route;
/*
| SPAのため全てのURLに対して 
| /views/welcome.blade.php を表示する
*/
Route::get('/{any?}',function (){
    return view('welcome');
}) ->where('any', '(?!.+twitter).+');

// Route::get('/login/twitter', 'App\Http\Controllers\AuthUserController@getProviderOAuthURL');
// Route::get('/login/twitter/callback', 'App\Http\Controllers\AuthUserController@handleCallBack');
//Route::post('/login/twitter/callback', 'App\Http\Controllers\AuthUserController@handleCallBack');

Route::get('/login/twitter', [App\Http\Controllers\Auth\LoginController::class, 'getProviderOAuthURL']);
Route::get('/login/twitter/callback', [App\Http\Controllers\Auth\LoginController::class, 'handleCallBack']);

Auth::routes();
