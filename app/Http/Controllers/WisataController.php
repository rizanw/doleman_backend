<?php

namespace App\Http\Controllers;

use App\Models\Wisata;
use Illuminate\Http\Request;

class WisataController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Wisata::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // $wisata = new Wisata;
        // $wisata->nama = $request->nama;
        // $wisata->alamat = $request->alamat;
        // $wisata->waktu_opr = $request->waktu_opr;
        // $wisata->harga = $request->harga;
        // $wisata->deskripsi = $request->deskripsi;
        // $wisata->max_visitor = $request->max_visitor;
        // $wisata->lat = $request->lat;
        // $wisata->lng = $request->lng;
        // $wisata->foto = $request->foto;

        $wisata = Wisata::create($request->all());

        return response()->json($wisata, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Wisata  $wisata
     * @return \Illuminate\Http\Response
     */
    public function show(Wisata $wisata)
    {
        return $wisata;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Wisata  $wisata
     * @return \Illuminate\Http\Response
     */
    public function edit(Wisata $wisata)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Wisata  $wisata
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Wisata $wisata)
    {
        $wisata->update($request->all());

        return response()->json($wisata, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Wisata  $wisata
     * @return \Illuminate\Http\Response
     */
    public function destroy(Wisata $wisata)
    {
        $wisata->delete();
        
        return response()->json(null, 204);
    }
}
