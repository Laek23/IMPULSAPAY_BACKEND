<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\NegocioController;
use App\Http\Controllers\Api\AdminController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
// 🔥 TEST
Route::get('/test', function () {
    return response()->json(['mensaje' => 'API funcionando']);
});

// 🔓 PÚBLICAS
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// 🔒 PROTEGIDAS
Route::middleware('auth:sanctum')->group(function () {

    // 👤 usuario autenticado
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // 🔥 ADMIN (YA NO POR EMAIL)
    Route::get('/admin', [AdminController::class, 'show']);
    Route::put('/admin', [AdminController::class, 'update']);

    // 🔐 negocios
    Route::apiResource('negocios', NegocioController::class);

    // 🚪 logout
    Route::post('/logout', [AuthController::class, 'logout']);
});

// 🔥 SOLO ADMIN
Route::middleware(['auth:sanctum', 'rol:1'])->group(function () {
    Route::get('/admin-negocios', [NegocioController::class, 'index']);
});

use App\Http\Controllers\TarjetaClienteController;

Route::get('/tarjetas', [TarjetaClienteController::class, 'listado']);
Route::post('/tarjetas', [TarjetaClienteController::class, 'guardar']);
Route::delete('/tarjetas/{id}', [TarjetaClienteController::class, 'eliminar']);

use App\Http\Controllers\ClienteController;

Route::get('/historial', [ClienteController::class, 'historialCliente']);
Route::get('/cliente/configuracion', [ClienteController::class, 'configuracion']);
Route::put('/cliente/actualizar', [ClienteController::class, 'actualizar']);

use App\Http\Controllers\SesionController;

Route::post('/logout', [SesionController::class, 'logout'])->middleware('auth:sanctum');