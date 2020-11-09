<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class BookingTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('booking', function(Blueprint $table){
            $table->increments('booking_id');
            $table->integer('id_bayar');
            $table->foreign('id_bayar')->references('pembayaran_id')->on('pembayaran')->onDelete('cascade')->onUpdate('cascade');
            
            $table->integer('id_pengguna');
            $table->foreign('id_pengguna')->references('pengguna_id')->on('pengguna')->onDelete('cascade')->onUpdate('cascade');
            
            $table->integer('id_tiket');
            $table->foreign('id_tiket')->references('tiket_id')->on('tiket')->onDelete('cascade')->onUpdate('cascade');
            $table->integer('jml_pesan')->nullable();
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
        Schema::dropIfExists('booking');
    }
}
