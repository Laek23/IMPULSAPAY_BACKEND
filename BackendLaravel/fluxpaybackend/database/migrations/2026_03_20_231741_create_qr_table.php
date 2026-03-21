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
    Schema::create('qr', function (Blueprint $table) {
        $table->id();

        $table->foreignId('idnegocio')->constrained('negocio')->onDelete('cascade');

        $table->foreignId('idmovimiento')->nullable()->constrained('movimiento')->nullOnDelete();

        $table->string('codigo', 255)->nullable();
        $table->decimal('monto', 10, 2)->nullable();

        $table->dateTime('fecha_creacion')->nullable();
        $table->dateTime('fecha_expiracion')->nullable();

        $table->tinyInteger('status')->nullable();

        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('qr');
    }
};
