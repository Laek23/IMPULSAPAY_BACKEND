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
        Schema::create('movimiento', function (Blueprint $table) {
            $table->id();

            $table->foreignId('idnegocio')
                  ->constrained('negocio')
                  ->onDelete('cascade');

            $table->unsignedBigInteger('iduser');

            $table->decimal('monto_total', 10, 2)->nullable();
            $table->decimal('comision', 10, 2)->nullable();

            $table->string('metodo_pago', 50)->nullable();
            $table->string('referencia_pago', 100)->nullable();

            $table->dateTime('fecha_movimiento')->nullable();
            $table->dateTime('fecha_devolucion')->nullable();

            $table->tinyInteger('status')->nullable();

            // Campos de Stripe
            $table->string('stripe_payment_intent', 255)->nullable();
            $table->string('stripe_charge_id', 255)->nullable();
            $table->string('stripe_status', 50)->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movimiento');
    }
};