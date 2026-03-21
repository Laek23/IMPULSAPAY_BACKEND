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
        Schema::create('cuenta_bancaria', function (Blueprint $table) {
            $table->id();

            $table->foreignId('idnegocio')->constrained('negocio')->onDelete('cascade');

            $table->string('banco', 100)->nullable();
            $table->string('numero_cuenta', 30)->nullable();
            $table->integer('longitud')->nullable();
            $table->string('clave', 50)->nullable();

            $table->date('fecha_registro')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cuenta_bancaria');
    }
};
