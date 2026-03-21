<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('planesnegocio', function (Blueprint $table) {
            $table->id();

            $table->foreignId('idplan')->constrained('plan')->onDelete('cascade');
            $table->foreignId('idnegocio')->constrained('negocio')->onDelete('cascade');

            $table->integer('dias')->nullable();

            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('planesnegocio');
    }
};
