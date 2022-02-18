<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * 値を代入を許可するフィールドを設定
     */
    protected $fillable = [
        'name',
        'twitter_id',
        'avatar',
    ];

    /**
     * データを取得しないフィールドを設定
     */
    protected $hidden = [
        // 'password',
        // 'remember_token',
    ];

    /**
     * DBから取得したデータを自動変換
     */
    protected $casts = [
        // 'email_verified_at' => 'datetime',
    ];

    public function tasks()
    {
        return  $this->hasMany(Task::class);
    }
}
