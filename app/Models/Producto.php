<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    protected $table = 'productos';

    // Esto mapea tus columnas de la base de datos con Laravel
    const CREATED_AT = 'fecha_registro';
    const UPDATED_AT = 'fecha_actualizacion';

    protected $fillable = [
        'nombre', 
        'precio', 
        'idnegocio', 
        'idmarca', 
        'tipoProducto',
        'status'
        // 'units' lo quitamos si no está en tu tabla física
    ];

    public function marca()
    {
        return $this->belongsTo(Marca::class, 'idmarca');
    }
    public function inventario()
{
    return $this->hasOne(Inventario::class, 'idproducto');
}

public function negocio()
{
    return $this->belongsTo(Negocio::class, 'idnegocio');
}
}