<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ChecklistItem extends Model
{

    public function item (){
        return $this->hasOne('\App\Item', 'id','item_id');
    }
}
