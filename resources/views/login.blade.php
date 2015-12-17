@extends('layouts.master')

@section('content')
    <h1 class="visually-hidden">What's in that fridge?</h1>

    <form method="post" class="login">
        <fieldset >
            <legend class="visually-hidden">Login</legend>

            <label for="password" >Password</label>

            <div class="input-pair ">
                <input class="input" type="password" name="password" id="password" autocomplete="off"  >
                <button type="submit">
                    <span class="icon-angle-right"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </fieldset>
    </form>
@endsection