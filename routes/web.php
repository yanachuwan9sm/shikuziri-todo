<?php

use Illuminate\Support\Facades\Route;

Route::get('/{any?}',function (){
    return view('welcome');
}) ->where('any', '(?!.+twitter).+');

Route::get('/login/twitter', [App\Http\Controllers\Auth\LoginController::class, 'getProviderOAuthURL']);
Route::get('/login/twitter/callback', [App\Http\Controllers\Auth\LoginController::class, 'handleCallBack']);

Auth::routes();
