<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('historial_suscripcion', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('idplanesnegocio');
            $table->string('accion', 45);
            $table->timestamp('fecha');
            $table->string('descripcion', 255);

            // Llave foránea opcional
        $table->foreign('idplanesnegocio')
          ->references('id')
          ->on('planesnegocio')
          ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('historial_suscripcion');
    }
};