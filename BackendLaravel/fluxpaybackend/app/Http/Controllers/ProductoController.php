<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Producto; // <--- OBLIGATORIO

class ProductoController extends Controller
{
    public function index()
    {
        try {
            // Cargamos con la marca para que no salga "Sin Marca" en React
            return response()->json(Producto::with('marca')->get());
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'nombre' => 'required|string',
                'idmarca' => 'required|integer',
                'tipoProducto' => 'required|string',
                'precio' => 'required|numeric',
                'idnegocio' => 'required|integer',
            ]);

            // Forzamos el status a 1 ya que lo vimos en tu DB
            $validated['status'] = 1;

            $producto = Producto::create($validated);
            return response()->json($producto, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $producto = Producto::findOrFail($id);
            $producto->update($request->all());
            return response()->json($producto);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $producto = Producto::findOrFail($id);
            $producto->delete();
            return response()->json(['message' => 'Eliminado correctamente']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}