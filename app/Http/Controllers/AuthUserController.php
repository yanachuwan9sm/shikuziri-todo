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
        $redirectUrl = Socialite::driver('twitter')
        ->redirect()->getTargetUrl();
        return response()->json([
            'redirect_url' => $redirectUrl,
        ]);
    }

    /*
    | 取得したデータを保存する
    */
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

         
            //Auth::login($new_user->id);
            //return $new_user;

            return redirect('/');
        }
        else //login
        {
          //Auth::login($user->id);
          //return $user;

            return redirect('/');
        }
    }

    public function getUser()
    {

    }
}
