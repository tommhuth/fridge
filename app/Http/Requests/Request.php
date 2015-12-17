<?php

namespace App\Http\Requests;

use App\SimpleAuth;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Response;

class Request extends FormRequest
{
    public function authorize()
    {
        return SimpleAuth::authorize(Request::header('X-API-KEY'));
    }

    public function rules(){
        return [];
    }

    public function forbiddenResponse(){
        return Response::make(view('errors.403'), 403);
    }
}
