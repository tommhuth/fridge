<?php


Route::get('/',  'AuthController@getIndex');
Route::get('login',  'AuthController@getLogin');
Route::get('logout',  'AuthController@getLogout');
Route::post('login',  'AuthController@postLogin');
Route::get('logs', '\Rap2hpoutre\LaravelLogViewer\LogViewerController@index');


Route::group(['prefix' => 'api'], function(){
    Route::resource('checklist-items', 'ChecklistItemsController');
    Route::resource('items', 'ItemsController');
    Route::resource('categories', 'CategoriesController');
});
