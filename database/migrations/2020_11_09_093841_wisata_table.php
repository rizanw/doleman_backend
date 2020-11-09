<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class WisataTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('wisata', function(Blueprint $table){
            $table->increments('wisata_id');
            $table->string('wisata_harga')->nullable();
            $table->string('wisata_alamat')->nullable();
            $table->timestamp('wisata_waktu_opr')->nullable();
            $table->integer('max_visitor')->nullable();
            $table->string('latitude')->nullable();
            $table->string('longitude')->nullable();
            $table->string('wisata_nama')->nullable();
            $table->string('wisata_deskripsi')->nullable();
            $table->string('foto')->nullable();

            $table->unsignedInteger('id_pengguna');
            $table->foreign('id_pengguna')->references('pengguna_id')->on('pengguna')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('wisata');
    }
}