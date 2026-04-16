<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Exception;

class TiendaClienteDashController extends Controller
{
    /**
     * Función privada para obtener el ID real del negocio.
     * Basado en tu tabla 'negocio', buscamos el 'id' donde 'iduser' sea el del usuario actual.
     */
private function getNegocioId(Request $request) 
{
    $user = $request->user();
    
    if (!$user) {
        throw new \Exception("Usuario no autenticado.");
    }

    $negocio = DB::table('negocio')->where('iduser', $user->id)->first();
    
    // CAMBIO TEMPORAL PARA DEBUGEAR:
    if (!$negocio) {
        throw new \Exception("El usuario ID: " . $user->id . " no tiene nada en la tabla 'negocio' bajo la columna 'iduser'");
    }

    return $negocio->id;
}
    // 1. PRODUCTOS: Basado en tu tabla 'productos'
    public function productos(Request $request)
    {
        try {
            $idNegocio = $this->getNegocioId($request);

            if (!$idNegocio) {
                return response()->json(['error' => 'No se encontró un negocio asociado'], 404);
            }

            // Según tu captura image_8bcb8a: columnas 'nombre', 'status', 'precio'
            $data = DB::table('productos')
                ->select('nombre as name', 'status as units', 'precio as income')
                ->where('idnegocio', $idNegocio) 
                ->get();

            return response()->json($data);
        } catch (Exception $e) {
            return response()->json(['error' => 'Error en Productos: ' . $e->getMessage()], 500);
        }
    }

    // 2. INGRESOS: Basado en tu tabla 'movimiento'
    public function ingresos(Request $request)
    {
        try {
            $idNegocio = $this->getNegocioId($request);

            if (!$idNegocio) return response()->json([], 200);

            // Según tu captura image_8bceed: columnas 'metodo_pago' y 'monto_total'
            $data = DB::table('movimiento')
                ->select('metodo_pago', DB::raw('SUM(monto_total) as total'))
                ->where('idnegocio', $idNegocio)
                ->groupBy('metodo_pago')
                ->get();

            return response()->json($data);
        } catch (Exception $e) {
            return response()->json(['error' => 'Error en Ingresos: ' . $e->getMessage()], 500);
        }
    }

    // 3. RESUMEN: Calcula totales para las cards del dashboard
    public function resumen(Request $request)
{
    try {
        $idNegocio = $this->getNegocioId($request);
        if (!$idNegocio) return response()->json(['total' => 0, 'efectivo' => 0, 'qr' => 0]);

        $efectivo = DB::table('movimiento')
            ->where('idnegocio', $idNegocio)
            ->where('metodo_pago', 'efectivo')
            ->sum('monto_total') ?? 0;

        $qr = DB::table('movimiento')
            ->where('idnegocio', $idNegocio)
            ->where('metodo_pago', 'qr')
            ->sum('monto_total') ?? 0;

        return response()->json([
            'total' => (float)($efectivo + $qr),
            'efectivo' => (float)$efectivo,
            'qr' => (float)$qr
        ]);
    } catch (Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}
}