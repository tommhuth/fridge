<?php

use App\Item;
use Illuminate\Database\Seeder;

class ItemsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $types = [
            'Chocolate','Salmon', 'Pork chops','Milk','Greek yogurt','Honey', 'Milk', 'Orange juice',
            'Salt', 'BBQ sauce', 'Cheese', 'Bread', 'Spaghetti', 'Potatoes', 'Rice',
            'Chicken fillet', 'Lobster', 'Lamb chop', 'Sweet tea', "Apple juice", "Bell peppers"
        ];

        Item::truncate();

        for($i = 0; $i < count($types); $i++) {
            $item = new Item();
            $item->name = $types[$i];
            $item->category_id = 1;
            $item->sluggify();
            $item->save();
        }
    }
}
