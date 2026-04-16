<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable; 

    protected $fillable = [
        'name',
        'email',
        'password',
        'telefono',
        'idrol' 
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
// --- ESTO ES LO ÚNICO QUE TIENES QUE AGREGAR ---
    public function movimientos()
    {
        // Conecta con la tabla 'movimiento' usando 'iduser' como llave
        return $this->hasMany(Movimiento::class, 'iduser');
    }
}