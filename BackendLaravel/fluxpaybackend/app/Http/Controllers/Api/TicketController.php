<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    // LISTAR TICKETS
    public function index(Request $request)
{
    $query = Ticket::with('negocio');

    // 🔥 SOLO FILTRAMOS SI TIENE NEGOCIO
    if ($request->user()->idrol != 1) {
        $query->where('negocio_id', $request->user()->id);
    }

    return response()->json($query->orderBy('created_at', 'desc')->get());
}

    // CREAR TICKET
    public function store(Request $request)
    {
        $request->validate([
            'cliente'     => 'required|string|max:255',
            'mensaje'     => 'required|string',
            'prioridad'   => 'required|string',
            'negocio_id'  => 'required|exists:negocio,id'
        ]);

        $ticket = Ticket::create([
            'cliente'    => $request->cliente,
            'mensaje'    => $request->mensaje,
            'estado'     => 'Pendiente',
            'prioridad'  => $request->prioridad,
            'negocio_id' => $request->negocio_id
        ]);

        return response()->json($ticket, 201);
    }

    // MOSTRAR UNO
    public function show(Request $request, $id)
    {
        $ticket = Ticket::with('negocio')->findOrFail($id);

        // Si no es admin, validar que sea suyo
        if (
            $request->user()->idrol != 1 &&
            optional($ticket->negocio)->iduser != $request->user()->id
        ) {
            return response()->json([
                'message' => 'No autorizado'
            ], 403);
        }

        return response()->json($ticket);
    }

    // ACTUALIZAR
    public function update(Request $request, $id)
    {
        $ticket = Ticket::findOrFail($id);

        $request->validate([
            'estado' => 'required|string|max:255',
            'prioridad' => 'nullable|string|max:255'
        ]);

        $ticket->update([
            'estado'    => $request->estado,
            'prioridad' => $request->prioridad ?? $ticket->prioridad
        ]);

        return response()->json($ticket);
    }

    // ELIMINAR
    public function destroy($id)
    {
        $ticket = Ticket::findOrFail($id);

        $ticket->delete();

        return response()->json([
            'message' => 'Ticket eliminado correctamente'
        ]);
    }
}