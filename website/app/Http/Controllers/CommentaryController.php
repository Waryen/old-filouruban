<?php

namespace App\Http\Controllers;

use App\Models\Commentary;
use Illuminate\Http\Request;

class CommentaryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        Commentary::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Commentary::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Commentary  $commentary
     * @return \Illuminate\Http\Response
     */
    public function show(Commentary $commentary)
    {
        return $commentary;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Commentary  $commentary
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Commentary $commentary)
    {
        $commentary->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Commentary  $commentary
     * @return \Illuminate\Http\Response
     */
    public function destroy(Commentary $commentary)
    {
        $commentary->delete();
    }
}
