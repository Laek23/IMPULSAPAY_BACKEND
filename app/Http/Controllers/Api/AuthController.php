<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use App\Models\Rol;

class AuthController extends Controller
{
    // REGISTER
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'rol' => 'required'
        ]);

        $idrol = match($request->rol) {
            'admin' => 1,
            'negocio' => 8,
            'cliente' => 9,
            default => 9
        };

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,

            //
            'password' => $request->password,

            'idrol' => $idrol
        ]);

        return response()->json([
            'message' => 'Usuario registrado correctamente',
            'user' => $user
        ]);
    }

   public function login(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'password' => 'required'
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        return response()->json([
            'message' => 'Credenciales incorrectas'
        ], 401);
    }

    // Elimina tokens anteriores
    $user->tokens()->delete();

    // Crear nuevo token
    $token = $user->createToken('auth_token')->plainTextToken;

    // Obtener información del rol
    $rol = DB::table('rol')
        ->where('id', $user->idrol)
        ->first();

    // Obtener permisos del usuario
    $permisos = DB::table('rolxpermiso')
        ->join('permiso', 'rolxpermiso.idpermiso', '=', 'permiso.id')
        ->where('rolxpermiso.idrol', $user->idrol)
        ->pluck('clave');

    return response()->json([
        'token' => $token,

        'user' => [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'idrol' => $user->idrol,
            'rol' => $rol->nombre,
            'permisos' => $permisos
        ]
    ]);
}
    // LOGOUT
    public function logout(Request $request)
    {
        if ($request->user()) {
            $request->user()->tokens()->delete();
        }

        return response()->json([
            'message' => 'Sesión cerrada correctamente'
        ]);
    }
}