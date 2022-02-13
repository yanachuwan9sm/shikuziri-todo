<?php

namespace App\Http\Controllers;

use App\Models\AuthUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class AuthUserController extends Controller
{
    /*
    | 認証プロバイダーのOAuth認可画面URL取得API
    */
    
    public function getProviderOAuthURL(){
        $redirectUrl = Socialite::driver('twitter')->redirect()->getTargetUrl();
        return response()->json([
            'redirect_url' => $redirectUrl,
        ]);
    }

    /*
    | 取得したデータを保存する
    */
    public function handleCallBack(){
        $social_user = Socialite::driver('twitter')->user();
        $user = AuthUser::where('provider_user_id', $social_user->getId())->first();

        if(count($user) < 1) //create AuthUser
        {
             AuthUser::create([
             'provider_name' => ($social_user->getName()) ? $social_user->getName() : $social_user->getNickname(),
             'provider_user_id' => $social_user->getId(),
             'provider_user_avatar' => $social_user->getAvatar(),
            ]);

            $reload_user = AuthUser::where('provider_user_id', $social_user->getId())->first();
            Auth::loginUsingId($reload_user->id);
        }
        else //login
        {
          Auth::loginUsingId($user->id);
        }

    }
}
