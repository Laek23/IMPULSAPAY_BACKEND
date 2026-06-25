<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PagosSeeder extends Seeder
{
    public function run()
    {
        DB::table('pagos')->insert([
            [
                'idplanesnegocio' => 1,
                'monto' => 150.00,
                'fecha_pago' => '2026-01-01 00:00:00',
                'metodo_pago' => 'tarjeta',
                'status' => 'pagado'
            ],
            [
                'idplanesnegocio' => 2,
                'monto' => 150.00,
                'fecha_pago' => '2026-01-01 00:00:00',
                'metodo_pago' => 'transferencia',
                'status' => 'pagado'
            ],
            [
                'idplanesnegocio' => 3,
                'monto' => 420.00,
                'fecha_pago' => '2026-01-01 00:00:00',
                'metodo_pago' => 'tarjeta',
                'status' => 'pagado'
            ],
            [
                'idplanesnegocio' => 4,
                'monto' => 150.00,
                'fecha_pago' => '2026-01-01 00:00:00',
                'metodo_pago' => 'efectivo',
                'status' => 'pagado'
            ],
            [
                'idplanesnegocio' => 5,
                'monto' => 420.00,
                'fecha_pago' => '2026-01-01 00:00:00',
                'metodo_pago' => 'tarjeta',
                'status' => 'rechazado'
            ],
            [
                'idplanesnegocio' => 6,
                'monto' => 0.00,
                'fecha_pago' => '2026-01-01 00:00:00',
                'metodo_pago' => 'efectivo',
                'status' => 'pagado'
            ],
            [
                'idplanesnegocio' => 7,
                'monto' => 420.00,
                'fecha_pago' => '2026-01-01 00:00:00',
                'metodo_pago' => 'transferencia',
                'status' => 'pagado'
            ],
            [
                'idplanesnegocio' => 8,
                'monto' => 0.00,
                'fecha_pago' => '2026-01-01 00:00:00',
                'metodo_pago' => 'efectivo',
                'status' => 'rechazado'
            ],
            [
                'idplanesnegocio' => 9,
                'monto' => 0.00,
                'fecha_pago' => '2026-01-01 00:00:00',
                'metodo_pago' => 'tarjeta',
                'status' => 'pagado'
            ],
            [
                'idplanesnegocio' => 10,
                'monto' => 0.00,
                'fecha_pago' => '2026-01-01 00:00:00',
                'metodo_pago' => 'transferencia',
                'status' => 'pagado'
            ],

            [
                'idplanesnegocio' => 11,
                'monto' => 150.00,
                'fecha_pago' => '2026-02-01 00:00:00',
                'metodo_pago' => 'tarjeta',
                'status' => 'pagado'
            ],
            [
                'idplanesnegocio' => 12,
                'monto' => 150.00,
                'fecha_pago' => '2026-02-01 00:00:00',
                'metodo_pago' => 'efectivo',
                'status' => 'pagado'
            ],
            [
                'idplanesnegocio' => 13,
                'monto' => 420.00,
                'fecha_pago' => '2026-02-01 00:00:00',
                'metodo_pago' => 'tarjeta',
                'status' => 'pagado'
            ],
            [
                'idplanesnegocio' => 14,
                'monto' => 150.00,
                'fecha_pago' => '2026-02-01 00:00:00',
                'metodo_pago' => 'transferencia',
                'status' => 'pagado'
            ],
            [
                'idplanesnegocio' => 15,
                'monto' => 420.00,
                'fecha_pago' => '2026-02-01 00:00:00',
                'metodo_pago' => 'tarjeta',
                'status' => 'rechazado'
            ],

            [
                'idplanesnegocio' => 16,
                'monto' => 150.00,
                'fecha_pago' => '2026-02-01 00:00:00',
                'metodo_pago' => 'efectivo',
                'status' => 'pagado'
            ],
            [
                'idplanesnegocio' => 17,
                'monto' => 0.00,
                'fecha_pago' => '2026-02-01 00:00:00',
                'metodo_pago' => 'tarjeta',
                'status' => 'pagado'
            ],
            [
                'idplanesnegocio' => 18,
                'monto' => 420.00,
                'fecha_pago' => '2026-02-01 00:00:00',
                'metodo_pago' => 'transferencia',
                'status' => 'pagado'
            ],
            [
                'idplanesnegocio' => 19,
                'monto' => 420.00,
                'fecha_pago' => '2026-02-01 00:00:00',
                'metodo_pago' => 'tarjeta',
                'status' => 'pagado'
            ],
            [
                'idplanesnegocio' => 20,
                'monto' => 150.00,
                'fecha_pago' => '2026-02-01 00:00:00',
                'metodo_pago' => 'efectivo',
                'status' => 'pagado'
            ],
        ]);
    }
}