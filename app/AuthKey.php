<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class AuthKey extends Model
{
    public $timestamps = false;
    protected $dates = ['expires_at'];

    public function extend(){
        $this->expires_at = $this->expires_at->addHour();
        $this->save();
    }

    public static function hasKey($key) {
        return  AuthKey::where('key', $key)->where('expires_at', '>', Carbon::now())->first();
    }

    public static function make(){
        $key = new AuthKey();
        $key->expires_at = Carbon::now()->addHours(2);
        $key->key = bcrypt(time());
        $key->save();

        return $key->key;
    }

}
