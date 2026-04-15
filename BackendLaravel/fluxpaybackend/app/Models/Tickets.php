<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tickets extends Model
{
    // Forzamos a que use la tabla 'tickets' que vimos en tu MySQL
    protected $table = 'tickets'; 

    // Estos son los campos que permitimos llenar desde el formulario
    protected $fillable = [
        'cliente', 
        'mensaje', 
        'prioridad', 
        'estado', 
        'negocio_id'
    ];
}