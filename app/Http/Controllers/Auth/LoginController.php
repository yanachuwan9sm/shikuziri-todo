<?php

namespace App\Http\Controllers\Auth;

use App\Models\AuthUser;
use App\Models\User;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Auth;
use Exception;

class LoginController extends Controller
{
    public function getProviderOAuthURL(){
        $redirectUrl = Socialite::driver('twitter')
        ->redirect()->getTargetUrl();
        return response()->json([
            'redirect_url' => $redirectUrl,
        ]);
    }
    
    public function handleCallBack(){

        $social_user = Socialite::driver('twitter')->user();
        $user = User::where('twitter_id', $social_user->getId())->first();

        if(!$user)//create AuthUser
        {
             User::create([
             'name' => ($social_user->getName()) ? $social_user->getName() : $social_user->getNickname(),
             'twitter_id' => $social_user->getId(),
             'avatar' => $social_user->getAvatar(),
            ]);

            $new_user = User::where('twitter_id', $social_user->getId())->first();

            if(Auth::loginUsingId($new_user->id,true)){
                return redirect('/');
            }

            throw new Exception('ログインに失敗しました。再度お試しください');          
        }
        else //login
        {
            if(Auth::loginUsingId($user->id,true)){
                return redirect('/');
            }
            throw new Exception('ログインに失敗しました。再度お試しください');      
        }
    }

    public function logout()
    {
        Auth::logout();
        return response()->json(['message' => 'Logged out'], 200);
    }

}
