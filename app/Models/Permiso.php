<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Permiso extends Model
{
    protected $table = "permiso";

    protected $fillable = [
        "nombre",
        "clave"
    ];

    public function roles()
    {
        return $this->belongsToMany(
            Rol::class,
            "rolxpermiso",
            "idpermiso",
            "idrol"
        );
    }
}