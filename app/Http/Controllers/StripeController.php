<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\PaymentIntent;
use Illuminate\Support\Facades\DB;
use Stripe\Account;
class StripeController extends Controller
{
    public function createPayment(Request $request)
    {
        Stripe::setApiKey(env('STRIPE_SECRET'));

        $amount = $request->amount ?? 1000;

        $paymentIntent = PaymentIntent::create([
            'amount' => $amount,
            'currency' => 'mxn',
            'automatic_payment_methods' => [
                'enabled' => true,
            ],
        ]);

        return response()->json([
            'client_secret' => $paymentIntent->client_secret,
            'payment_intent_id' => $paymentIntent->id
        ]);
    }
    public function saveMovimiento(Request $request)
{
    $movimientoId = DB::table('movimiento')->insertGetId([
        'idnegocio' => 1, // ficticio por ahora
        'iduser' => 1,     // cliente ficticio
        'monto_total' => $request->monto_total,
        'comision' => $request->comision,
        'metodo_pago' => 'stripe',
        'referencia_pago' => 'test_' . time(),
        'fecha_movimiento' => now(),
        'status' => 1,

        'stripe_payment_intent' => $request->payment_intent,
        'stripe_charge_id' => $request->charge_id ?? null,
        'stripe_status' => $request->stripe_status ?? 'succeeded',

        'created_at' => now(),
        'updated_at' => now()
    ]);

    DB::table('detalle_movimientos')->insert([
        'idmovimiento' => $movimientoId,
        'idproducto' => 1, // ficticio
        'cantidad' => 1,
        'precio_unitario' => $request->monto_total,
        'subtotal' => $request->monto_total,
        'status' => 1,
        'created_at' => now(),
        'updated_at' => now()
    ]);

    return response()->json([
        'message' => 'Movimiento guardado correctamente',
        'id' => $movimientoId
    ]);
}


public function crearCuentaPrueba()
{
    try {

        Stripe::setApiKey(env('STRIPE_SECRET'));

        $account = Account::create([
            'type' => 'express',
            'country' => 'MX',
            'email' => 'prueba@fluxapay.com',
        ]);

        return response()->json($account);

    } catch (\Exception $e) {

        return response()->json([
            'error' => true,
            'mensaje' => $e->getMessage(),
        ], 500);

    }
}
}