<?php

namespace App\Http\Controllers\Api; // Debe coincidir con tu carpeta

use App\Http\Controllers\Controller;
use App\Models\Movimiento;
use Illuminate\Http\Request;

class MovimientoController extends Controller
{
    public function index(Request $request)
    {
        $query = Movimiento::query();

        // Filtro por concepto (campo referencia_pago en tu imagen anterior)
        if ($request->filled('q')) {
            $query->where('referencia_pago', 'LIKE', '%' . $request->q . '%');
        }

        // Filtro por rango de fechas
        if ($request->filled('desde')) {
            $query->whereDate('fecha_movimiento', '>=', $request->desde);
        }
        if ($request->filled('hasta')) {
            $query->whereDate('fecha_movimiento', '<=', $request->hasta);
        }

        // Traer los últimos 50 movimientos por defecto
        return response()->json($query->orderBy('fecha_movimiento', 'desc')->limit(50)->get());
    }
}