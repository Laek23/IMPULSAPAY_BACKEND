<?php

// app/Http/Controllers/MarcaController.php
namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class MarcaController extends Controller
{
    public function index()
    {
        try {
            // Consultamos directo a la tabla para evitar líos de Modelos
            $marcas = DB::table('marca')->get(); 
            return response()->json($marcas);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}