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
        Schema::create('productos', function (Blueprint $table) {
            $table->id();

            $table->string('nombre', 150)->nullable();
            $table->decimal('precio', 10, 2)->nullable();

            $table->foreignId('idnegocio')->constrained('negocio')->onDelete('cascade');

            $table->foreignId('idmarca')
                ->nullable()
                ->constrained('marca')
                ->nullOnDelete();

            $table->tinyInteger('status')->default(1);

            $table->date('fecha_registro')->nullable();
            $table->date('fecha_actualizacion')->nullable();

            $table->string('tipoProducto', 50)->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('productos');
    }
};
