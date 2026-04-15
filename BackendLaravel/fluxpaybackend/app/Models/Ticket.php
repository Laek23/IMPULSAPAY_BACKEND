<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{


    protected $fillable = [
    'cliente',
    'mensaje',
    'estado',
    'prioridad',
    'negocio_id'
];

public function negocio()
{
    return $this->belongsTo(Negocio::class, 'negocio_id');
}
public function tickets()
{
    return $this->hasMany(\App\Models\Ticket::class, 'negocio_id');
}
}

