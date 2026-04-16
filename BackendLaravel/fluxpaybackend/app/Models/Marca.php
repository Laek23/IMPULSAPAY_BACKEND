<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Marca extends Model
{
    protected $table = 'marca'; // Según tu diagrama se llama 'marca' en singular

    protected $fillable = ['nombre', 'idnegocio'];

    // Una marca tiene muchos productos
    public function productos()
    {
        return $this->hasMany(Producto::class, 'idmarca', 'id');
    }
}