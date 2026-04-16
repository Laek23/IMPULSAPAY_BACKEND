<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Movimiento extends Model
{
    protected $table = 'movimiento'; // Nombre exacto en tu imagen
    
    // Si tus campos de fecha no son 'created_at', desactiva timestamps o configúralos
    public $timestamps = false; 
}