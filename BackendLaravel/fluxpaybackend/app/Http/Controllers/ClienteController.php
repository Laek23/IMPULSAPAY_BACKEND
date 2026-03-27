<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;


class ClienteController extends Controller
{
    public function historialCliente()
    {
        $movimientos = DB::table('movimiento as m')
            ->join('detalle_movimientos as d', 'm.id', '=', 'd.idmovimiento')
            ->join('productos as p', 'd.idproducto', '=', 'p.id')
            ->select(
                'm.fecha_movimiento',
                'p.nombre as producto',
                'm.monto_total',
                'm.status'
            )
            ->where('m.iduser', 1) // fijo usuario 1
            ->orderBy('m.fecha_movimiento', 'desc')
            ->get();

        $data = $movimientos->map(function ($item) {
            return [
                date('d/m/Y', strtotime($item->fecha_movimiento)),
                $item->producto,
                'MXN ' . $item->monto_total,
                $item->status == 1 ? 'Completado' : 'Pendiente'
            ];
        });

        return response()->json($data);
    }

    public function configuracion()
    {
        $user = User::find(1); // usuario fijo

        return response()->json([
            'nombre' => $user->name,
            'correo' => $user->email
        ]);
    }
    public function actualizar(Request $request)
    {
        $user = User::find(1); // usuario fijo
        // validar contraseña si viene
        if ($request->has('current_password')) {

            if (!Hash::check($request->current_password, $user->password)) {
                return response()->json([
                    'error' => 'Contraseña incorrecta'
                ], 400);
            }
        }
        // actualizar nombre
        if ($request->nombre) {
            $user->name = $request->nombre;
        }
        // actualizar correo
        if ($request->correo) {
            $user->email = $request->correo;
        }
        // actualizar contraseña
        if ($request->password) {
            $user->password = Hash::make($request->password);
        }
        $user->save();
        return response()->json([
            'ok' => true
        ]);
    }



    ///añadir para el clientes en negocio el curd
    public function store(Request $request)
{
    // Validamos los datos que vienen de React
    $request->validate([
        'nombre' => 'required|string|max:255',
        'correo' => 'required|email|unique:users,email',
    ]);

    $cliente = User::create([
        'name' => $request->nombre,
        'email' => $request->correo,
        'password' => Hash::make('password123'), // Contraseña genérica obligatoria en BD
        'idrol' => 9, // TU ROL DE CLIENTE
    ]);

    return response()->json($cliente, 201);
}

// app/Http/Controllers/ClienteController.php

public function index()
{
    
    return User::where('idrol', 9)->get(); 
}
//para editar correo y nombre

public function update(Request $request, $id)
{
    // 1. Validamos los datos que vienen del modal de React
    $request->validate([
        'nombre' => 'required|string|max:255',
        'correo' => 'required|email|unique:users,email,' . $id,
    ]);

    // 2. Buscamos al cliente (User con idrol 9)
    $cliente = User::where('idrol', 9)->findOrFail($id);

    // 3. Actualizamos los campos
    $cliente->update([
        'name' => $request->nombre,
        'email' => $request->correo,
        // No actualizamos el password aquí para no resetearlo por error
    ]);

    return response()->json([
        'message' => 'Cliente actualizado correctamente',
        'cliente' => $cliente
    ]);
}


//eliminar clientes 

public function destroy($id)
{
    try {
        // Buscamos al usuario asegurándonos que sea un cliente (rol 9)
        $cliente = User::where('idrol', 9)->findOrFail($id);
        
        // Lo eliminamos
        $cliente->delete();

        return response()->json([
            'message' => 'Cliente eliminado con éxito'
        ], 200);
        
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'No se pudo eliminar el cliente',
            'error' => $e->getMessage()
        ], 500);
    }
}

}
