<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inventario extends Model
{
    protected $table = "inventarios";

    protected $fillable = [
        "idproducto",
        "idnegocio",
        "stock",
        "stock_minimo",
        "en_produccion",
        "estado"
    ];

    // Relación con Producto
    public function producto()
    {
        return $this->belongsTo(Producto::class, "idproducto");
    }

    // Relación con Negocio
    public function negocio()
    {
        return $this->belongsTo(Negocio::class, "idnegocio");
    }
}