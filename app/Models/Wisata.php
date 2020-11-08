<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wisata extends Model
{
    protected $table = 'wisata';
    public $timestamps = false;

    protected $fillable = [
        'nama',
        'deskripsi',
        'harga',
        'alamat',
        'waktu_opr',
        'max_visitor',
        'lat',
        'lng',
        'foto'
    ];
}
