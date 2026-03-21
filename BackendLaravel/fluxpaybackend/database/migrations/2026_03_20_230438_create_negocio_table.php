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
        Schema::create('negocio', function (Blueprint $table) {
            $table->id();

            $table->foreignId('iduser')->constrained('users')->onDelete('cascade');

            $table->string('nombre', 150);

            $table->foreignId('idtipo')->nullable()->constrained('tipo_negocio')->nullOnDelete();

            $table->string('rfc', 20)->nullable();
            $table->string('codigo_postal', 10)->nullable();
            $table->text('descripcion')->nullable();

            $table->tinyInteger('status')->default(1);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('negocio');
    }
};
