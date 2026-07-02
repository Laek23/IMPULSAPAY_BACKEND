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
    Schema::create('inventarios', function (Blueprint $table) {

        $table->id();

        // Producto al que pertenece el inventario
        $table->foreignId('idproducto')
              ->constrained('productos')
              ->onDelete('cascade');

        // Negocio dueño del inventario
        $table->foreignId('idnegocio')
              ->constrained('negocio')
              ->onDelete('cascade');

        // Cantidad disponible
        $table->integer('stock')->default(0);

        // Stock mínimo permitido
        $table->integer('stock_minimo')->default(10);

        // Productos que actualmente se están fabricando
        $table->integer('en_produccion')->default(0);

        // Estado del inventario
        $table->enum('estado', [
            'Disponible',
            'Bajo',
            'Agotado'
        ])->default('Disponible');

        $table->timestamps();
    });
}
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventarios');
    }
};
