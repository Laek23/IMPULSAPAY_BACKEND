<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rol extends Model
{
    protected $table = "rol";

    protected $fillable = [
        "nombre"
    ];

    public function permisos()
    {
        return $this->belongsToMany(
            Permiso::class,
            "rolxpermiso",
            "idrol",
            "idpermiso"
        );
    }
}