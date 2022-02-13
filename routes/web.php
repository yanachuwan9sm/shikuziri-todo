<?php

use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('welcome');
// });

/*
| SPAのため全てのURLに対して 
| /views/welcome.blade.php を表示する
*/
Route::get('/{any?}',function (){
    return view('welcome');
}) ->where('any', '(?!.+twitter).+');

  Route::get('/login/twitter', 'App\Http\Controllers\AuthUserController@getProviderOAuthURL');
    Route::post('/login/twitter/callback', 'App\Http\Controllers\AuthUserController@handleCallBack');


