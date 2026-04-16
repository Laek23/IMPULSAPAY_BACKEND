<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Tickets; // <-- Ahora sí coincide
use Illuminate\Support\Facades\Log;

class GenerarTicketController extends Controller 
{
    public function index() 
    {
        try {
            // Usamos Tickets en plural
            return response()->json(Tickets::orderBy('created_at', 'desc')->get(), 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            // Usamos Tickets en plural
            $ticket = Tickets::create([
                'cliente'    => $request->cliente ?? 'Usuario FluxPay', 
                'mensaje'    => $request->mensaje, 
                'prioridad'  => $request->prioridad,
                'estado'     => 'Pendiente',
                'negocio_id' => 1,
            ]);
            return response()->json($ticket, 201);
        } catch (\Exception $e) {
            Log::error("Error en Ticket Store: " . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}