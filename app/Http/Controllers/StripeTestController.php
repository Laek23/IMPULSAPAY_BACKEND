<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\PaymentIntent;

class StripeTestController extends Controller
{
    public function testPayment()
    {
        // Clave secreta desde .env
        Stripe::setApiKey(env('STRIPE_SECRET'));

        // Crear un pago de prueba
        $paymentIntent = PaymentIntent::create([
            'amount' => 1000, // 10.00 MXN o USD según config
            'currency' => 'mxn',
            'payment_method_types' => ['card'],
        ]);

        return response()->json([
            'client_secret' => $paymentIntent->client_secret,
            'id' => $paymentIntent->id
        ]);
    }
}