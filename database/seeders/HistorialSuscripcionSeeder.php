<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class HistorialSuscripcionSeeder extends Seeder
{
    public function run()
    {
        //
        DB::table('planesnegocio')->insert([
            ['idplan' => 2, 'idnegocio' => 1, 'fecha_inicio' => '2026-01-01 00:00:00', 'fecha_fin' => '2026-01-31 00:00:00', 'status' => 'activa'],
            ['idplan' => 2, 'idnegocio' => 2, 'fecha_inicio' => '2026-01-01 00:00:00', 'fecha_fin' => '2026-01-31 00:00:00', 'status' => 'activa'],
            ['idplan' => 2, 'idnegocio' => 3, 'fecha_inicio' => '2026-01-01 00:00:00', 'fecha_fin' => '2026-01-31 00:00:00', 'status' => 'activa'],
            ['idplan' => 2, 'idnegocio' => 4, 'fecha_inicio' => '2026-01-01 00:00:00', 'fecha_fin' => '2026-01-31 00:00:00', 'status' => 'activa'],
            ['idplan' => 3, 'idnegocio' => 5, 'fecha_inicio' => '2026-01-01 00:00:00', 'fecha_fin' => '2026-01-31 00:00:00', 'status' => 'cancelada'],

            ['idplan' => 1, 'idnegocio' => 6, 'fecha_inicio' => '2026-01-01 00:00:00', 'fecha_fin' => '2026-01-15 00:00:00', 'status' => 'activa'],
            ['idplan' => 3, 'idnegocio' => 7, 'fecha_inicio' => '2026-01-01 00:00:00', 'fecha_fin' => '2026-01-31 00:00:00', 'status' => 'activa'],
            ['idplan' => 1, 'idnegocio' => 8, 'fecha_inicio' => '2026-01-01 00:00:00', 'fecha_fin' => '2026-01-15 00:00:00', 'status' => 'cancelada'],
            ['idplan' => 1, 'idnegocio' => 9, 'fecha_inicio' => '2026-01-01 00:00:00', 'fecha_fin' => '2026-01-15 00:00:00', 'status' => 'activa'],
            ['idplan' => 1, 'idnegocio' => 10, 'fecha_inicio' => '2026-01-01 00:00:00', 'fecha_fin' => '2026-01-15 00:00:00', 'status' => 'activa'],

            ['idplan' => 2, 'idnegocio' => 11, 'fecha_inicio' => '2026-02-01 00:00:00', 'fecha_fin' => '2026-03-03 00:00:00', 'status' => 'activa'],
            ['idplan' => 2, 'idnegocio' => 12, 'fecha_inicio' => '2026-02-01 00:00:00', 'fecha_fin' => '2026-03-03 00:00:00', 'status' => 'activa'],
            ['idplan' => 3, 'idnegocio' => 13, 'fecha_inicio' => '2026-02-01 00:00:00', 'fecha_fin' => '2026-03-03 00:00:00', 'status' => 'activa'],
            ['idplan' => 2, 'idnegocio' => 14, 'fecha_inicio' => '2026-02-01 00:00:00', 'fecha_fin' => '2026-03-03 00:00:00', 'status' => 'activa'],
            ['idplan' => 3, 'idnegocio' => 15, 'fecha_inicio' => '2026-02-01 00:00:00', 'fecha_fin' => '2026-03-03 00:00:00', 'status' => 'cancelada'],

            ['idplan' => 2, 'idnegocio' => 16, 'fecha_inicio' => '2026-02-01 00:00:00', 'fecha_fin' => '2026-03-03 00:00:00', 'status' => 'activa'],
            ['idplan' => 1, 'idnegocio' => 17, 'fecha_inicio' => '2026-02-01 00:00:00', 'fecha_fin' => '2026-02-15 00:00:00', 'status' => 'activa'],
            ['idplan' => 3, 'idnegocio' => 18, 'fecha_inicio' => '2026-02-01 00:00:00', 'fecha_fin' => '2026-03-03 00:00:00', 'status' => 'activa'],
            ['idplan' => 3, 'idnegocio' => 19, 'fecha_inicio' => '2026-02-01 00:00:00', 'fecha_fin' => '2026-03-03 00:00:00', 'status' => 'activa'],
            ['idplan' => 2, 'idnegocio' => 20, 'fecha_inicio' => '2026-02-01 00:00:00', 'fecha_fin' => '2026-03-03 00:00:00', 'status' => 'activa'],

            ['idplan' => 2, 'idnegocio' => 21, 'fecha_inicio' => '2026-03-01 00:00:00', 'fecha_fin' => '2026-03-31 00:00:00', 'status' => 'activa'],
            ['idplan' => 1, 'idnegocio' => 22, 'fecha_inicio' => '2026-03-01 00:00:00', 'fecha_fin' => '2026-03-15 00:00:00', 'status' => 'activa'],
            ['idplan' => 1, 'idnegocio' => 23, 'fecha_inicio' => '2026-03-01 00:00:00', 'fecha_fin' => '2026-03-15 00:00:00', 'status' => 'activa'],
            ['idplan' => 1, 'idnegocio' => 24, 'fecha_inicio' => '2026-03-01 00:00:00', 'fecha_fin' => '2026-03-15 00:00:00', 'status' => 'activa'],
            ['idplan' => 3, 'idnegocio' => 25, 'fecha_inicio' => '2026-03-01 00:00:00', 'fecha_fin' => '2026-03-31 00:00:00', 'status' => 'cancelada'],

            ['idplan' => 3, 'idnegocio' => 26, 'fecha_inicio' => '2026-03-01 00:00:00', 'fecha_fin' => '2026-03-31 00:00:00', 'status' => 'activa'],
            ['idplan' => 1, 'idnegocio' => 27, 'fecha_inicio' => '2026-03-01 00:00:00', 'fecha_fin' => '2026-03-15 00:00:00', 'status' => 'cancelada'],
            ['idplan' => 2, 'idnegocio' => 28, 'fecha_inicio' => '2026-03-01 00:00:00', 'fecha_fin' => '2026-03-31 00:00:00', 'status' => 'activa'],
            ['idplan' => 3, 'idnegocio' => 29, 'fecha_inicio' => '2026-03-01 00:00:00', 'fecha_fin' => '2026-03-31 00:00:00', 'status' => 'activa'],
            ['idplan' => 1, 'idnegocio' => 30, 'fecha_inicio' => '2026-03-01 00:00:00', 'fecha_fin' => '2026-03-15 00:00:00', 'status' => 'activa'],

            ['idplan' => 1, 'idnegocio' => 31, 'fecha_inicio' => '2026-04-01 00:00:00', 'fecha_fin' => '2026-04-15 00:00:00', 'status' => 'activa'],
            ['idplan' => 3, 'idnegocio' => 32, 'fecha_inicio' => '2026-04-01 00:00:00', 'fecha_fin' => '2026-05-01 00:00:00', 'status' => 'activa'],
            ['idplan' => 3, 'idnegocio' => 33, 'fecha_inicio' => '2026-04-01 00:00:00', 'fecha_fin' => '2026-05-01 00:00:00', 'status' => 'activa'],
            ['idplan' => 2, 'idnegocio' => 34, 'fecha_inicio' => '2026-04-01 00:00:00', 'fecha_fin' => '2026-05-01 00:00:00', 'status' => 'activa'],
            ['idplan' => 2, 'idnegocio' => 35, 'fecha_inicio' => '2026-04-01 00:00:00', 'fecha_fin' => '2026-05-01 00:00:00', 'status' => 'activa'],

            ['idplan' => 2, 'idnegocio' => 36, 'fecha_inicio' => '2026-04-01 00:00:00', 'fecha_fin' => '2026-05-01 00:00:00', 'status' => 'activa'],
            ['idplan' => 3, 'idnegocio' => 37, 'fecha_inicio' => '2026-04-01 00:00:00', 'fecha_fin' => '2026-05-01 00:00:00', 'status' => 'activa'],
            ['idplan' => 2, 'idnegocio' => 38, 'fecha_inicio' => '2026-04-01 00:00:00', 'fecha_fin' => '2026-05-01 00:00:00', 'status' => 'activa'],
            ['idplan' => 2, 'idnegocio' => 39, 'fecha_inicio' => '2026-04-01 00:00:00', 'fecha_fin' => '2026-05-01 00:00:00', 'status' => 'activa'],
            ['idplan' => 1, 'idnegocio' => 40, 'fecha_inicio' => '2026-04-01 00:00:00', 'fecha_fin' => '2026-04-15 00:00:00', 'status' => 'activa'],
        ]);
        //pagos
        DB::table('pagos')->insert([
    [
        'idplan' => 2,
        'idnegocio' => 1,
        'fecha_inicio' => '2026-01-01 00:00:00',
        'fecha_fin' => '2026-01-31 00:00:00',
        'status' => 'activa'
    ],
    [
        'idplan' => 2,
        'idnegocio' => 2,
        'fecha_inicio' => '2026-01-01 00:00:00',
        'fecha_fin' => '2026-01-31 00:00:00',
        'status' => 'activa'
    ],
    [
        'idplan' => 2,
        'idnegocio' => 3,
        'fecha_inicio' => '2026-01-01 00:00:00',
        'fecha_fin' => '2026-01-31 00:00:00',
        'status' => 'activa'
    ],
    [
        'idplan' => 2,
        'idnegocio' => 4,
        'fecha_inicio' => '2026-01-01 00:00:00',
        'fecha_fin' => '2026-01-31 00:00:00',
        'status' => 'activa'
    ],
    [
        'idplan' => 3,
        'idnegocio' => 5,
        'fecha_inicio' => '2026-01-01 00:00:00',
        'fecha_fin' => '2026-01-31 00:00:00',
        'status' => 'cancelada'
    ],

    [
        'idplan' => 1,
        'idnegocio' => 6,
        'fecha_inicio' => '2026-01-01 00:00:00',
        'fecha_fin' => '2026-01-15 00:00:00',
        'status' => 'activa'
    ],
    [
        'idplan' => 3,
        'idnegocio' => 7,
        'fecha_inicio' => '2026-01-01 00:00:00',
        'fecha_fin' => '2026-01-31 00:00:00',
        'status' => 'activa'
    ],
    [
        'idplan' => 1,
        'idnegocio' => 8,
        'fecha_inicio' => '2026-01-01 00:00:00',
        'fecha_fin' => '2026-01-15 00:00:00',
        'status' => 'cancelada'
    ],
    [
        'idplan' => 1,
        'idnegocio' => 9,
        'fecha_inicio' => '2026-01-01 00:00:00',
        'fecha_fin' => '2026-01-15 00:00:00',
        'status' => 'activa'
    ],
    [
        'idplan' => 1,
        'idnegocio' => 10,
        'fecha_inicio' => '2026-01-01 00:00:00',
        'fecha_fin' => '2026-01-15 00:00:00',
        'status' => 'activa'
    ],

    [
        'idplan' => 2,
        'idnegocio' => 11,
        'fecha_inicio' => '2026-02-01 00:00:00',
        'fecha_fin' => '2026-03-03 00:00:00',
        'status' => 'activa'
    ],
    [
        'idplan' => 2,
        'idnegocio' => 12,
        'fecha_inicio' => '2026-02-01 00:00:00',
        'fecha_fin' => '2026-03-03 00:00:00',
        'status' => 'activa'
    ],
    [
        'idplan' => 3,
        'idnegocio' => 13,
        'fecha_inicio' => '2026-02-01 00:00:00',
        'fecha_fin' => '2026-03-03 00:00:00',
        'status' => 'activa'
    ],
    [
        'idplan' => 2,
        'idnegocio' => 14,
        'fecha_inicio' => '2026-02-01 00:00:00',
        'fecha_fin' => '2026-03-03 00:00:00',
        'status' => 'activa'
    ],
    [
        'idplan' => 3,
        'idnegocio' => 15,
        'fecha_inicio' => '2026-02-01 00:00:00',
        'fecha_fin' => '2026-03-03 00:00:00',
        'status' => 'cancelada'
    ],
    [
        'idplan' => 2,
        'idnegocio' => 16,
        'fecha_inicio' => '2026-02-01 00:00:00',
        'fecha_fin' => '2026-03-03 00:00:00',
        'status' => 'activa'
    ],
    [
        'idplan' => 1,
        'idnegocio' => 17,
        'fecha_inicio' => '2026-02-01 00:00:00',
        'fecha_fin' => '2026-02-15 00:00:00',
        'status' => 'activa'
    ],
    [
        'idplan' => 3,
        'idnegocio' => 18,
        'fecha_inicio' => '2026-02-01 00:00:00',
        'fecha_fin' => '2026-03-03 00:00:00',
        'status' => 'activa'
    ],
    [
        'idplan' => 3,
        'idnegocio' => 19,
        'fecha_inicio' => '2026-02-01 00:00:00',
        'fecha_fin' => '2026-03-03 00:00:00',
        'status' => 'activa'
    ],
    [
        'idplan' => 2,
        'idnegocio' => 20,
        'fecha_inicio' => '2026-02-01 00:00:00',
        'fecha_fin' => '2026-03-03 00:00:00',
        'status' => 'activa'
    ],
]);
    DB::table('historial_suscripcion')->insert([
    // ALTAS (1–40)
    ['idplanesnegocio' => 1, 'accion' => 'alta', 'fecha' => '2026-01-01 00:00:00', 'descripcion' => 'Suscripcion creada'],
    ['idplanesnegocio' => 2, 'accion' => 'alta', 'fecha' => '2026-01-01 00:00:00', 'descripcion' => 'Suscripcion creada'],
    ['idplanesnegocio' => 3, 'accion' => 'alta', 'fecha' => '2026-01-01 00:00:00', 'descripcion' => 'Suscripcion creada'],
    ['idplanesnegocio' => 4, 'accion' => 'alta', 'fecha' => '2026-01-01 00:00:00', 'descripcion' => 'Suscripcion creada'],
    ['idplanesnegocio' => 5, 'accion' => 'alta', 'fecha' => '2026-01-01 00:00:00', 'descripcion' => 'Suscripcion creada'],
    ['idplanesnegocio' => 6, 'accion' => 'alta', 'fecha' => '2026-01-01 00:00:00', 'descripcion' => 'Suscripcion creada'],
    ['idplanesnegocio' => 7, 'accion' => 'alta', 'fecha' => '2026-01-01 00:00:00', 'descripcion' => 'Suscripcion creada'],
    ['idplanesnegocio' => 8, 'accion' => 'alta', 'fecha' => '2026-01-01 00:00:00', 'descripcion' => 'Suscripcion creada'],
    ['idplanesnegocio' => 9, 'accion' => 'alta', 'fecha' => '2026-01-01 00:00:00', 'descripcion' => 'Suscripcion creada'],
    ['idplanesnegocio' => 10, 'accion' => 'alta', 'fecha' => '2026-01-01 00:00:00', 'descripcion' => 'Suscripcion creada'],

    ['idplanesnegocio' => 11, 'accion' => 'alta', 'fecha' => '2026-02-01 00:00:00', 'descripcion' => 'Suscripcion creada'],
    ['idplanesnegocio' => 12, 'accion' => 'alta', 'fecha' => '2026-02-01 00:00:00', 'descripcion' => 'Suscripcion creada'],
    ['idplanesnegocio' => 13, 'accion' => 'alta', 'fecha' => '2026-02-01 00:00:00', 'descripcion' => 'Suscripcion creada'],
    ['idplanesnegocio' => 14, 'accion' => 'alta', 'fecha' => '2026-02-01 00:00:00', 'descripcion' => 'Suscripcion creada'],
    ['idplanesnegocio' => 15, 'accion' => 'alta', 'fecha' => '2026-02-01 00:00:00', 'descripcion' => 'Suscripcion creada'],
    ['idplanesnegocio' => 16, 'accion' => 'alta', 'fecha' => '2026-02-01 00:00:00', 'descripcion' => 'Suscripcion creada'],
    ['idplanesnegocio' => 17, 'accion' => 'alta', 'fecha' => '2026-02-01 00:00:00', 'descripcion' => 'Suscripcion creada'],
    ['idplanesnegocio' => 18, 'accion' => 'alta', 'fecha' => '2026-02-01 00:00:00', 'descripcion' => 'Suscripcion creada'],
    ['idplanesnegocio' => 19, 'accion' => 'alta', 'fecha' => '2026-02-01 00:00:00', 'descripcion' => 'Suscripcion creada'],
    ['idplanesnegocio' => 20, 'accion' => 'alta', 'fecha' => '2026-02-01 00:00:00', 'descripcion' => 'Suscripcion creada'],

    ['idplanesnegocio' => 21, 'accion' => 'alta', 'fecha' => '2026-03-01 00:00:00', 'descripcion' => 'Suscripcion creada'],
    ['idplanesnegocio' => 22, 'accion' => 'alta', 'fecha' => '2026-03-01 00:00:00', 'descripcion' => 'Suscripcion creada'],
    ['idplanesnegocio' => 23, 'accion' => 'alta', 'fecha' => '2026-03-01 00:00:00', 'descripcion' => 'Suscripcion creada'],
    ['idplanesnegocio' => 24, 'accion' => 'alta', 'fecha' => '2026-03-01 00:00:00', 'descripcion' => 'Suscripcion creada'],
    ['idplanesnegocio' => 25, 'accion' => 'alta', 'fecha' => '2026-03-01 00:00:00', 'descripcion' => 'Suscripcion creada'],
    ['idplanesnegocio' => 26, 'accion' => 'alta', 'fecha' => '2026-03-01 00:00:00', 'descripcion' => 'Suscripcion creada'],
    ['idplanesnegocio' => 27, 'accion' => 'alta', 'fecha' => '2026-03-01 00:00:00', 'descripcion' => 'Suscripcion creada'],
    ['idplanesnegocio' => 28, 'accion' => 'alta', 'fecha' => '2026-03-01 00:00:00', 'descripcion' => 'Suscripcion creada'],
    ['idplanesnegocio' => 29, 'accion' => 'alta', 'fecha' => '2026-03-01 00:00:00', 'descripcion' => 'Suscripcion creada'],
    ['idplanesnegocio' => 30, 'accion' => 'alta', 'fecha' => '2026-03-01 00:00:00', 'descripcion' => 'Suscripcion creada'],

    ['idplanesnegocio' => 31, 'accion' => 'alta', 'fecha' => '2026-04-01 00:00:00', 'descripcion' => 'Suscripcion creada'],
    ['idplanesnegocio' => 32, 'accion' => 'alta', 'fecha' => '2026-04-01 00:00:00', 'descripcion' => 'Suscripcion creada'],
    ['idplanesnegocio' => 33, 'accion' => 'alta', 'fecha' => '2026-04-01 00:00:00', 'descripcion' => 'Suscripcion creada'],
    ['idplanesnegocio' => 34, 'accion' => 'alta', 'fecha' => '2026-04-01 00:00:00', 'descripcion' => 'Suscripcion creada'],
    ['idplanesnegocio' => 35, 'accion' => 'alta', 'fecha' => '2026-04-01 00:00:00', 'descripcion' => 'Suscripcion creada'],
    ['idplanesnegocio' => 36, 'accion' => 'alta', 'fecha' => '2026-04-01 00:00:00', 'descripcion' => 'Suscripcion creada'],
    ['idplanesnegocio' => 37, 'accion' => 'alta', 'fecha' => '2026-04-01 00:00:00', 'descripcion' => 'Suscripcion creada'],
    ['idplanesnegocio' => 38, 'accion' => 'alta', 'fecha' => '2026-04-01 00:00:00', 'descripcion' => 'Suscripcion creada'],
    ['idplanesnegocio' => 39, 'accion' => 'alta', 'fecha' => '2026-04-01 00:00:00', 'descripcion' => 'Suscripcion creada'],
    ['idplanesnegocio' => 40, 'accion' => 'alta', 'fecha' => '2026-04-01 00:00:00', 'descripcion' => 'Suscripcion creada'],

    // RENOVACIONES
    ['idplanesnegocio' => 41, 'accion' => 'renovacion', 'fecha' => '2026-02-01 00:00:00', 'descripcion' => 'Renovacion mensual'],
    ['idplanesnegocio' => 42, 'accion' => 'renovacion', 'fecha' => '2026-02-01 00:00:00', 'descripcion' => 'Renovacion mensual'],
    ['idplanesnegocio' => 43, 'accion' => 'renovacion', 'fecha' => '2026-02-01 00:00:00', 'descripcion' => 'Renovacion mensual'],
    ['idplanesnegocio' => 44, 'accion' => 'renovacion', 'fecha' => '2026-02-01 00:00:00', 'descripcion' => 'Renovacion mensual'],
    ['idplanesnegocio' => 45, 'accion' => 'renovacion', 'fecha' => '2026-02-01 00:00:00', 'descripcion' => 'Renovacion mensual'],

    // CANCELACIONES
    ['idplanesnegocio' => 46, 'accion' => 'cancelacion', 'fecha' => '2026-03-15 00:00:00', 'descripcion' => 'Cancelado'],
    ['idplanesnegocio' => 47, 'accion' => 'cancelacion', 'fecha' => '2026-03-20 00:00:00', 'descripcion' => 'Cancelado'],
    ['idplanesnegocio' => 48, 'accion' => 'cancelacion', 'fecha' => '2026-04-01 00:00:00', 'descripcion' => 'Cancelado'],
    ['idplanesnegocio' => 49, 'accion' => 'cancelacion', 'fecha' => '2026-02-15 00:00:00', 'descripcion' => 'Cancelado'],
    ['idplanesnegocio' => 50, 'accion' => 'cancelacion', 'fecha' => '2026-03-25 00:00:00', 'descripcion' => 'Cancelado'],
]);
    }
}