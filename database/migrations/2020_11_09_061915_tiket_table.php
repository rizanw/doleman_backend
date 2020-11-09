<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class TiketTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tiket', function(Blueprint $table){
            $table->increments('tiket_id');

            $table->integer('id_bayar');
            $table->foreign('id_bayar')->references('pembayaran_id')->on('pembayaran')->onDelete('cascade')->onUpdate('cascade');
            
            $table->integer('id_wisata');
            $table->foreign('id_wisata')->references('wisata_id')->on('wisata')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('tiket_nama')->nullable();
            $table->integer('harga')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tiket');
    }
}
