<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RolPermiso extends Model
{
    protected $table = "rolxpermiso";

    protected $fillable = [
        "idrol",
        "idpermiso"
    ];

    public $timestamps = false;
}