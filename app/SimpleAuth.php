<?php

namespace App;


use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class SimpleAuth
{
    const EXPIRATION = 2700;

    static function login($password){
        $result = null;

        if($password == env('API_PASSWORD')) {
            $key = AuthKey::make();
            self::setAuthKey($key);

            return $key;
        }

        return $result;
    }

    static function setAuthKey($key){
        Session::put('auth_key', $key);
        self::extendExpirationDate();
    }

    static function extendExpirationDate(){
        Session::put('auth_expires_at', time() + self::EXPIRATION);
    }

    static function hasExpired(){
        return Session::get('auth_expires_at') < time();
    }

    static function authorize($key) {
        $keyRecord = AuthKey::hasKey($key);

        if($keyRecord) {
            $keyRecord->extend();

            return true;
        }

        return false;
    }

    static function pageAuthorized(){
        $authd =  self::getKey() != null;

        if($authd && !self::hasExpired()) {
            self::extendExpirationDate();

            return true;
        }

        self::logout();

        return false;
    }


    static function getKey(){
        return Session::get('auth_key');
    }

    static function logout(){
        Session::forget('auth_key');
        Session::put('auth_expires_at');
    }
}