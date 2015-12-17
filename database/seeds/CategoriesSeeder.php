<?php

use Illuminate\Database\Seeder;
use \App\Category;

class CategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $types = ['Basics','Meat and fish','Diary','Dry goods','Fruit and vegetables', 'Condiments'];

        Category::truncate();

        for($i = 0; $i < count($types); $i++) {
            $category = new Category();
            $category->name = $types[$i];
            $category->save();
        }
    }
}
