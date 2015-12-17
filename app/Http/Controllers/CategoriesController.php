<?php

namespace App\Http\Controllers;

use App\Category;
use App\Http\Requests\Request;
use App\Http\Controllers\Controller;

class CategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $categories = Category::all();

        return $this->jsonResponse($categories);
    }

}
