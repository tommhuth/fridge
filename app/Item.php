<?php

namespace App;

use Carbon\Carbon;
use Cviebrock\EloquentSluggable\SluggableTrait;
use Illuminate\Database\Eloquent\Model;
use Nicolaslopezj\Searchable\SearchableTrait;

class Item extends Model
{
    use SluggableTrait, SearchableTrait;

    protected $fillable = ['name', 'slug', 'amount', 'unit_id', 'category_id'];
    protected $sluggable = [
        'build_from' => 'name',
        'save_to' => 'slug',
        'unique' => true
    ];
    protected $searchable = [
        'columns' => [
            'name' => 1,
        ]
    ];
    protected $casts = [
        'favorite' => 'boolean',
    ];

    public function category(){
        return $this->belongsTo('App\Category', 'category_id');
    }

    public function currentChecklistItem(){
        return $this->hasOne('App\ChecklistItem', 'item_id','id')
            ->where('checklist_items.created_at', '>=', new Carbon('today'));
    }
}
