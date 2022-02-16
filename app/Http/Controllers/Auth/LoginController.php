<?php

namespace App\Http\Controllers\Auth;

use App\Models\AuthUser;
use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Auth;

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
        $user = AuthUser::where('user_id', $social_user->getId())->first();

        if(!$user)//create AuthUser
        {
             AuthUser::create([
             'name' => ($social_user->getName()) ? $social_user->getName() : $social_user->getNickname(),
             'user_id' => $social_user->getId(),
             'user_avatar' => $social_user->getAvatar(),
            ]);

            $new_user = AuthUser::where('user_id', $social_user->getId())->first();

         
            Auth::login($new_user->id);
            //return $new_user;

            return redirect('/');
        }
        else //login
        {
          Auth::login($user->id);
          //return $user;

            return redirect('/');
        }
    }

}
