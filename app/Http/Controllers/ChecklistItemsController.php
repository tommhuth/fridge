<?php

namespace App\Http\Controllers;

use App\ChecklistItem;
use App\Http\Requests\StoreChecklistItemRequest;
use Carbon\Carbon;
use App\Http\Requests\Request;
use App\Http\Controllers\Controller;

class ChecklistItemsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $checklist = ChecklistItem::with('item.category')
            ->get()->groupBy(function ($item) {
                return $item->created_at->year . '-' . $item->created_at->month . '-' . $item->created_at->day;
            });

        return $this->jsonResponse($checklist);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreChecklistItemRequest $request)
    {
        $item = new ChecklistItem();
        $item->item_id = $request->input('item_id');
        $item->save();

        return $this->jsonResponse($item->fresh()->load('item.category'));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        $day = $this->getDayDuration($id);

        $items = ChecklistItem::with('item.category')
            ->where('created_at', '>=', $day->start)
            ->where('created_at', '<=', $day->end)
            ->get();


        return $this->jsonResponse($items);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, $id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $day = $this->getDayDuration($id);

        ChecklistItem::with('item.category')
            ->where('created_at', '>=', $day->start)
            ->where('created_at', '<=', $day->end)
            ->delete();

        return response(null, 204);
    }

    private function getDayDuration($date) {
        $dateParts = explode("-", $date);
        $result = new \stdClass();
        $result->start = Carbon::create($dateParts[0], $dateParts[1],$dateParts[2], 0, 0,0 );
        $result->end = $result->start->copy()->addHours(23)->addMinutes(59)->addSecond(59);

        return $result;
    }
}
