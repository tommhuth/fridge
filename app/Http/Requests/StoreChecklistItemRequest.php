<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class StoreChecklistItemRequest extends Request
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'item_id' => 'exists:items,id'
        ];
    }
}
