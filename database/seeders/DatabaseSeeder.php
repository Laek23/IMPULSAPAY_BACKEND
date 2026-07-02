<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        // USERS

        // Clientes
        for ($i = 0; $i < 80; $i++) {
            DB::table('users')->insert([
                'name' => $faker->name,
                'email' => $faker->unique()->safeEmail,
                'password' => Hash::make('123456'),
                'idrol' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Vendedores
        for ($i = 0; $i < 40; $i++) {
            DB::table('users')->insert([
                'name' => $faker->name,
                'email' => $faker->unique()->safeEmail,
                'password' => Hash::make('123456'),
                'idrol' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $vendedores = DB::table('users')->where('idrol', 2)->pluck('id');
        $clientes   = DB::table('users')->where('idrol', 3)->pluck('id');

        // TIPO NEGOCIO
        DB::table('tipo_negocio')->insert([
            ['nombre'=>'Tienda','created_at'=>now(),'updated_at'=>now()],
            ['nombre'=>'Servicio','created_at'=>now(),'updated_at'=>now()],
        ]);

        $tipos = DB::table('tipo_negocio')->pluck('id');
        // PLANES (AGREGAR AQUÍ)
        DB::table('plan')->insert([
            [
                'nombre' => 'basico',
                'dias' => 14,
                'precio' => 0.00
            ],
            [
                'nombre' => 'estandar',
                'dias' => 30,
                'precio' => 150.00
            ],
            [
                'nombre' => 'premium',
                'dias' => 30,
                'precio' => 420.00
            ]
        ]);

        $planes = DB::table('plan')->pluck('id');

        // NEGOCIOS
        $negocios = [];

        foreach ($vendedores as $v) {
            $negocios[] = DB::table('negocio')->insertGetId([
                'iduser'=>$v,
                'nombre'=>$faker->company,
                'idtipo'=>$faker->randomElement($tipos),
                'rfc'=>strtoupper($faker->bothify('????######???')),
                'codigo_postal'=>$faker->postcode,
                'descripcion'=>$faker->sentence,
                'status'=>1,
                'created_at'=>now(),
                'updated_at'=>now(),
            ]);
        }

        // PLANES NEGOCIO


        // DIRECCION
        foreach ($negocios as $n) {
            DB::table('direccion')->insert([
                'idnegocio'=>$n,
                'numero_exterior'=>$faker->buildingNumber,
                'numero_interior'=>$faker->optional()->randomDigit,
                'estado'=>'Yucatán',
                'created_at'=>now(),
                'updated_at'=>now(),
            ]);
        }

        // CUENTA BANCARIA
        foreach ($negocios as $n) {
            DB::table('cuenta_bancaria')->insert([
                'idnegocio'=>$n,
                'banco'=>$faker->randomElement(['BBVA','Banorte','Santander']),
                'numero_cuenta'=>$faker->bankAccountNumber,
                'longitud'=>10,
                'clave'=>strtoupper($faker->bothify('CLV###??')),
                'fecha_registro'=>now(),
                'created_at'=>now(),
                'updated_at'=>now(),
            ]);
        }

        // MARCAS
        $marcas = [];
        for ($i = 0; $i < 20; $i++) {
            $marcas[] = DB::table('marca')->insertGetId([
                'nombre'=>$faker->company,
                'descripcion'=>$faker->sentence,
                'created_at'=>now(),
                'updated_at'=>now(),
            ]);
        }

        // CATALOGO REAL
        $catalogo = [
            'iPhone 13','Samsung Galaxy S22','Xiaomi Redmi Note 12',
            'Laptop HP 15','Laptop Lenovo IdeaPad','MacBook Air M1',
            'Monitor LG 24 pulgadas','Teclado mecanico RGB',
            'Mouse Logitech','Disco SSD Kingston 1TB',
            'Smart TV Samsung 50 pulgadas','Control Xbox Series X',
            'Silla gamer ergonomica','Escritorio de oficina',
            'Audifonos Sony Bluetooth','Bocina JBL Charge',
            'Cafetera Oster','Licuadora Ninja',
            'Freidora de aire','Ventilador de torre',
            'Zapatillas Nike Air','Tenis Adidas Running',
            'Sudadera deportiva','Jeans slim fit',
            'Perfume Calvin Klein','Reloj Casio',
            'Mochila escolar','Maleta de viaje',
            'Libro de programacion','Agenda 2026'
        ];

        $adjetivos = ['Pro','Max','Plus','Ultra','2024'];

        // PRODUCTOS (100)
        for ($i = 0; $i < 100; $i++) {
            DB::table('productos')->insert([
                'nombre' => $catalogo[array_rand($catalogo)] . ' ' . $adjetivos[array_rand($adjetivos)],
                'precio' => rand(100, 5000),
                'idnegocio' => $negocios[array_rand($negocios)],
                'idmarca' => $marcas[array_rand($marcas)],
                'status' => 1,
                'fecha_registro' => now(),
                'fecha_actualizacion' => now(),
                'tipoProducto' => ['fisico','digital'][array_rand(['fisico','digital'])],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // MOVIMIENTOS (700)
        $movimientos = [];

        for ($i = 0; $i < 700; $i++) {
            $movimientos[] = DB::table('movimiento')->insertGetId([
                'idnegocio'=>$faker->randomElement($negocios),
                'iduser'=>$faker->randomElement($clientes),
                'monto_total'=>0,
                'comision'=>0,
                'metodo_pago'=>$faker->randomElement(['tarjeta','efectivo','transferencia','QR']),
                'referencia_pago'=>strtoupper($faker->bothify('REF###??')),
                'fecha_movimiento'=>$faker->dateTimeThisYear(),
                'status'=>1,
                'created_at'=>now(),
                'updated_at'=>now(),
            ]);
        }

        // DETALLE MOVIMIENTOS (REAL)
        foreach ($movimientos as $mov) {
            $total = 0;

            for ($i = 0; $i < rand(3,6); $i++) {

                $producto = DB::table('productos')->inRandomOrder()->first();

                $cantidad = rand(1,4);
                $subtotal = $cantidad * $producto->precio;
                $total += $subtotal;

                DB::table('detalle_movimientos')->insert([
                    'idmovimiento'=>$mov,
                    'idproducto'=>$producto->id,
                    'cantidad'=>$cantidad,
                    'precio_unitario'=>$producto->precio,
                    'subtotal'=>$subtotal,
                    'status'=>1,
                    'created_at'=>now(),
                    'updated_at'=>now(),
                ]);
            }

            DB::table('movimiento')->where('id',$mov)->update([
                'monto_total'=>$total,
                'comision'=>$total * 0.05
            ]);
        }

        // QR (700)
        foreach ($movimientos as $mov) {
            DB::table('qr')->insert([
                'idnegocio'=>$faker->randomElement($negocios),
                'idmovimiento'=>$mov,
                'codigo'=>strtoupper($faker->uuid),
                'monto'=>$faker->randomFloat(2,50,500),
                'fecha_creacion'=>now(),
                'fecha_expiracion'=>now()->addDays(2),
                'status'=>1,
                'created_at'=>now(),
                'updated_at'=>now(),
            ]);
        }

        // TARJETAS
        foreach ($clientes as $c) {
            DB::table('tarjeta_cliente')->insert([
                'user_id'=>$c,
                'brand'=>$faker->creditCardType,
                'last4'=>substr($faker->creditCardNumber,-4),
                'exp_month'=>rand(1,12),
                'exp_year'=>rand(2026,2032),
                'name'=>$faker->name,
                'created_at'=>now(),
                'updated_at'=>now(),
            ]);
        }
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
    // PAGOS 0 (free / sin cobro)
    ['idplanesnegocio' => 6,  'monto' => 0,   'fecha_pago' => '2026-01-01 00:00:00', 'metodo_pago' => 'Tarjeta', 'status' => 'completado'],
    ['idplanesnegocio' => 8,  'monto' => 0,   'fecha_pago' => '2026-01-01 00:00:00', 'metodo_pago' => 'Tarjeta', 'status' => 'completado'],
    ['idplanesnegocio' => 9,  'monto' => 0,   'fecha_pago' => '2026-01-01 00:00:00', 'metodo_pago' => 'Tarjeta', 'status' => 'completado'],
    ['idplanesnegocio' => 10, 'monto' => 0,   'fecha_pago' => '2026-01-01 00:00:00', 'metodo_pago' => 'Tarjeta', 'status' => 'completado'],
    ['idplanesnegocio' => 17, 'monto' => 0,   'fecha_pago' => '2026-02-01 00:00:00', 'metodo_pago' => 'Tarjeta', 'status' => 'completado'],
    ['idplanesnegocio' => 22, 'monto' => 0,   'fecha_pago' => '2026-03-01 00:00:00', 'metodo_pago' => 'Tarjeta', 'status' => 'completado'],
    ['idplanesnegocio' => 23, 'monto' => 0,   'fecha_pago' => '2026-03-01 00:00:00', 'metodo_pago' => 'Tarjeta', 'status' => 'completado'],
    ['idplanesnegocio' => 24, 'monto' => 0,   'fecha_pago' => '2026-03-01 00:00:00', 'metodo_pago' => 'Tarjeta', 'status' => 'completado'],
    ['idplanesnegocio' => 27, 'monto' => 0,   'fecha_pago' => '2026-03-01 00:00:00', 'metodo_pago' => 'Tarjeta', 'status' => 'completado'],
    ['idplanesnegocio' => 30, 'monto' => 0,   'fecha_pago' => '2026-03-01 00:00:00', 'metodo_pago' => 'Tarjeta', 'status' => 'completado'],
    ['idplanesnegocio' => 31, 'monto' => 0,   'fecha_pago' => '2026-04-01 00:00:00', 'metodo_pago' => 'Tarjeta', 'status' => 'completado'],
    ['idplanesnegocio' => 40, 'monto' => 0,   'fecha_pago' => '2026-04-01 00:00:00', 'metodo_pago' => 'Tarjeta', 'status' => 'completado'],

    // PLAN 150
    ['idplanesnegocio' => 1,  'monto' => 150, 'fecha_pago' => '2026-01-01 00:00:00', 'metodo_pago' => 'Tarjeta', 'status' => 'completado'],
    ['idplanesnegocio' => 2,  'monto' => 150, 'fecha_pago' => '2026-01-01 00:00:00', 'metodo_pago' => 'Tarjeta', 'status' => 'completado'],
    ['idplanesnegocio' => 3,  'monto' => 150, 'fecha_pago' => '2026-01-01 00:00:00', 'metodo_pago' => 'Tarjeta', 'status' => 'completado'],
    ['idplanesnegocio' => 4,  'monto' => 150, 'fecha_pago' => '2026-01-01 00:00:00', 'metodo_pago' => 'Tarjeta', 'status' => 'completado'],
    ['idplanesnegocio' => 11, 'monto' => 150, 'fecha_pago' => '2026-02-01 00:00:00', 'metodo_pago' => 'Tarjeta', 'status' => 'completado'],
    ['idplanesnegocio' => 12, 'monto' => 150, 'fecha_pago' => '2026-02-01 00:00:00', 'metodo_pago' => 'Tarjeta', 'status' => 'completado'],
    ['idplanesnegocio' => 14, 'monto' => 150, 'fecha_pago' => '2026-02-01 00:00:00', 'metodo_pago' => 'Tarjeta', 'status' => 'completado'],
    ['idplanesnegocio' => 16, 'monto' => 150, 'fecha_pago' => '2026-02-01 00:00:00', 'metodo_pago' => 'Tarjeta', 'status' => 'completado'],
    ['idplanesnegocio' => 20, 'monto' => 150, 'fecha_pago' => '2026-02-01 00:00:00', 'metodo_pago' => 'Tarjeta', 'status' => 'completado'],
    ['idplanesnegocio' => 21, 'monto' => 150, 'fecha_pago' => '2026-03-01 00:00:00', 'metodo_pago' => 'Tarjeta', 'status' => 'completado'],
    ['idplanesnegocio' => 28, 'monto' => 150, 'fecha_pago' => '2026-03-01 00:00:00', 'metodo_pago' => 'Tarjeta', 'status' => 'completado'],
    ['idplanesnegocio' => 34, 'monto' => 150, 'fecha_pago' => '2026-04-01 00:00:00', 'metodo_pago' => 'Tarjeta', 'status' => 'completado'],
    ['idplanesnegocio' => 35, 'monto' => 150, 'fecha_pago' => '2026-04-01 00:00:00', 'metodo_pago' => 'Tarjeta', 'status' => 'completado'],
    ['idplanesnegocio' => 36, 'monto' => 150, 'fecha_pago' => '2026-04-01 00:00:00', 'metodo_pago' => 'Tarjeta', 'status' => 'completado'],
    ['idplanesnegocio' => 38, 'monto' => 150, 'fecha_pago' => '2026-04-01 00:00:00', 'metodo_pago' => 'Tarjeta', 'status' => 'completado'],
    ['idplanesnegocio' => 39, 'monto' => 150, 'fecha_pago' => '2026-04-01 00:00:00', 'metodo_pago' => 'Tarjeta', 'status' => 'completado'],

    // PLAN 420
    ['idplanesnegocio' => 5,  'monto' => 420, 'fecha_pago' => '2026-01-01 00:00:00', 'metodo_pago' => 'Tarjeta', 'status' => 'completado'],
    ['idplanesnegocio' => 7,  'monto' => 420, 'fecha_pago' => '2026-01-01 00:00:00', 'metodo_pago' => 'Tarjeta', 'status' => 'completado'],
    ['idplanesnegocio' => 13, 'monto' => 420, 'fecha_pago' => '2026-02-01 00:00:00', 'metodo_pago' => 'Tarjeta', 'status' => 'completado'],
    ['idplanesnegocio' => 15, 'monto' => 420, 'fecha_pago' => '2026-02-01 00:00:00', 'metodo_pago' => 'Tarjeta', 'status' => 'completado'],
    ['idplanesnegocio' => 18, 'monto' => 420, 'fecha_pago' => '2026-02-01 00:00:00', 'metodo_pago' => 'Tarjeta', 'status' => 'completado'],
    ['idplanesnegocio' => 19, 'monto' => 420, 'fecha_pago' => '2026-02-01 00:00:00', 'metodo_pago' => 'Tarjeta', 'status' => 'completado'],
    ['idplanesnegocio' => 25, 'monto' => 420, 'fecha_pago' => '2026-03-01 00:00:00', 'metodo_pago' => 'Tarjeta', 'status' => 'completado'],
    ['idplanesnegocio' => 26, 'monto' => 420, 'fecha_pago' => '2026-03-01 00:00:00', 'metodo_pago' => 'Tarjeta', 'status' => 'completado'],
    ['idplanesnegocio' => 29, 'monto' => 420, 'fecha_pago' => '2026-03-01 00:00:00', 'metodo_pago' => 'Tarjeta', 'status' => 'completado'],
    ['idplanesnegocio' => 32, 'monto' => 420, 'fecha_pago' => '2026-04-01 00:00:00', 'metodo_pago' => 'Tarjeta', 'status' => 'completado'],
    ['idplanesnegocio' => 33, 'monto' => 420, 'fecha_pago' => '2026-04-01 00:00:00', 'metodo_pago' => 'Tarjeta', 'status' => 'completado'],
    ['idplanesnegocio' => 37, 'monto' => 420, 'fecha_pago' => '2026-04-01 00:00:00', 'metodo_pago' => 'Tarjeta', 'status' => 'completado'],
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

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}