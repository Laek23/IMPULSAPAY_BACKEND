<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TarjetaCliente;
use Illuminate\Support\Facades\Auth;

class TarjetaClienteController extends Controller
{
    public function listado()
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['mensaje' => 'No autenticado'], 401);
        }

        $tarjetas = TarjetaCliente::where('user_id', $user->id)->get();

        return response()->json($tarjetas);
    }

    public function guardar(Request $r)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['mensaje' => 'No autenticado'], 401);
        }

        $tarjeta = TarjetaCliente::create([
            'user_id'   => $user->id,
            'brand'     => $r->brand,
            'last4'     => $r->last4,
            'exp_month' => $r->exp_month,
            'exp_year'  => $r->exp_year,
            'name'      => $r->name,
        ]);

        return response()->json([
            'mensaje' => 'Tarjeta guardada',
            'data' => $tarjeta
        ]);
    }

    public function eliminar($id)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['mensaje' => 'No autenticado'], 401);
        }

        $tarjeta = TarjetaCliente::where('id', $id)
            ->where('user_id', $user->id)
            ->firstOrFail();

        $tarjeta->delete();

        return response()->json([
            'mensaje' => 'Tarjeta eliminada'
        ]);
    }
}