<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Rol;
use App\Models\Permiso;
use App\Models\RolPermiso;

class RolPermisoController extends Controller
{
    // Obtener todos los roles
    public function roles()
    {
        return response()->json(
            Rol::orderBy("id")->get()
        );
    }

    // Obtener todos los permisos
    public function permisos()
    {
        return response()->json(
            Permiso::orderBy("id")->get()
        );
    }

    // Obtener permisos de un rol
    public function permisosRol($id)
    {
        $permisos = RolPermiso::where("idrol", $id)
            ->pluck("idpermiso");

        return response()->json($permisos);
    }

    // Guardar permisos de un rol
    public function guardar(Request $request, $id)
    {
        RolPermiso::where("idrol", $id)->delete();

        foreach ($request->permisos as $permiso) {

            RolPermiso::create([
                "idrol" => $id,
                "idpermiso" => $permiso
            ]);

        }

        return response()->json([
            "message" => "Permisos actualizados correctamente"
        ]);
    }
}