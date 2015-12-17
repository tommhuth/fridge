<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreItemRequest;
use App\Item;
use App\Http\Requests\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Session;

class ItemsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $items = Item::search($request->input('search'))
            ->with(['category', 'currentChecklistItem'])
            ->get();

       return $this->jsonResponse($items);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreItemRequest $request)
    {
        $item = new Item([
            'name' => ucfirst($request->input('name'))
        ]);
        $item->sluggify();
        $item->save();

        return $this->jsonResponse($item->fresh()->load('category'));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        $item = Item::findBySlugOrIdOrFail($id)->load('category');


        return $this->jsonResponse($item);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $item = Item::findBySlugOrIdOrFail($id);

        $item->amount = $request->input('amount');
        $item->favorite = $request->input('favorite');
        $item->name = ucfirst($request->input('name'));
        $item->category_id = $request->input('category_id');
        $item->resluggify();
        $item->save();

        return $this->jsonResponse($item->load('category'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        Item::findBySlugOrIdOrFail($id)->delete();

        return response(null, 204);
    }
}
