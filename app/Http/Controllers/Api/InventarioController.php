<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Inventario;
use App\Models\Producto;

class InventarioController extends Controller
{
    // Mostrar inventario
   public function index()
{

    $inventario = Inventario::with([
        "producto",
        "negocio"
    ])->get();

    return response()->json([

        "productos"=>$inventario->count(),

        "stock_bajo"=>$inventario->where("estado","Bajo")->count(),

        "agotados"=>$inventario->where("estado","Agotado")->count(),

        "produccion"=>$inventario->sum("en_produccion"),

        "inventario"=>$inventario

    ]);

}

    // Sincronizar productos existentes
    public function sincronizar()
    {
        $productos = Producto::all();

        foreach ($productos as $producto) {

            $existe = Inventario::where("idproducto", $producto->id)->first();

            if (!$existe) {

                Inventario::create([
                    "idproducto" => $producto->id,
                    "idnegocio" => $producto->idnegocio,
                    "stock" => 0,
                    "stock_minimo" => 10,
                    "en_produccion" => 0,
                    "estado" => "Agotado"
                ]);

            }

        }

        return response()->json([
            "message" => "Inventario sincronizado correctamente"
        ]);
    }

    private function actualizarEstado($inventario)
{

    if($inventario->stock<=0){

        $inventario->estado="Agotado";

    }elseif($inventario->stock<=$inventario->stock_minimo){

        $inventario->estado="Bajo";

    }else{

        $inventario->estado="Disponible";

    }

    $inventario->save();

}
}