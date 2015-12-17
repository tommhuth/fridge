<?php

namespace App\Http\Controllers;

use App\SimpleAuth;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Session;

class AuthController extends Controller
{

    public function getLogin(){
        return view('login');
    }

    public function getLogout(){
        SimpleAuth::logout();

        return redirect('/login');
    }

    public function postLogin(){
        $success = SimpleAuth::login(Input::get('password'));

        if($success) return redirect('/');

        return redirect('/login');
    }

    public function getIndex(){
        if(SimpleAuth::pageAuthorized())
            return view('app')->with('key', SimpleAuth::getKey());
        else
            return redirect('/login');
    }

}
