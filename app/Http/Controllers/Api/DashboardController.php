<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Models\Ticket;

class DashboardController extends Controller
{
    public function index()
    {
        try {
            $tablaMovimiento = 'movimiento';
            $tablaNegocio = 'negocio';

            // Forzamos Marzo 2026
            $mes = 3;
            $anio = 2026;

            // Totales Generales
            $ingresosTotales = DB::table($tablaMovimiento)->sum('monto_total') ?: 0;
            $transaccionesTotales = DB::table($tablaMovimiento)->count();

            // Total de tickets
            $ticketsTotales = Ticket::count();

            // Datos específicos de Marzo
            $ingresosMes = DB::table($tablaMovimiento)
                ->whereMonth('fecha_movimiento', $mes)
                ->whereYear('fecha_movimiento', $anio)
                ->sum('monto_total') ?: 0;

            $transaccionesMes = DB::table($tablaMovimiento)
                ->whereMonth('fecha_movimiento', $mes)
                ->whereYear('fecha_movimiento', $anio)
                ->count();

            // Gráfica
            $grafica = DB::table($tablaMovimiento)
                ->selectRaw('DATE(fecha_movimiento) as fecha, SUM(monto_total) as total')
                ->whereMonth('fecha_movimiento', $mes)
                ->groupBy('fecha')
                ->orderBy('fecha', 'asc')
                ->get();

            // Negocios recientes
            $negociosRecientes = DB::table($tablaNegocio)
                ->select('id', 'nombre', 'created_at')
                ->orderBy('created_at', 'desc')
                ->limit(5)
                ->get();

            return response()->json([
                'mesNombre' => 'Marzo',
                'ingresosTotales' => (float)$ingresosTotales,
                'ingresosMes' => (float)$ingresosMes,
                'transacciones' => $transaccionesTotales,
                'transaccionesMes' => $transaccionesMes,
                'negocios' => DB::table($tablaNegocio)->count(),
                'ticketsTotales' => $ticketsTotales,
                'negociosRecientes' => $negociosRecientes,
                'grafica' => $grafica,
                'crecimiento' => 15.8
            ], 200);

        } catch (\Exception $e) {

            return response()->json([
                'error' => 'Error en el servidor',
                'detalle' => $e->getMessage()
            ], 500);

        }
    }
}