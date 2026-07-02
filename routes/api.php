<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

// Controllers
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\NegocioController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\TicketController;
use App\Http\Controllers\TarjetaClienteController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\SesionController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\MarcaController;
use App\Http\Controllers\Api\TiendaClienteDashController;
use App\Http\Controllers\Api\RolPermisoController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\GenerarTicketController;
use App\Http\Controllers\Api\MovimientoController;
use App\Http\Controllers\StripeController;
use App\Http\Controllers\Api\InventarioController;

/*
|--------------------------------------------------------------------------
| TEST
|--------------------------------------------------------------------------
*/
Route::get('/test', function () {
    return response()->json(['mensaje' => 'API funcionando']);
});

/*
|--------------------------------------------------------------------------
| AUTENTICACIÓN (PÚBLICAS)
|--------------------------------------------------------------------------
*/
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/dashboard', [DashboardController::class, 'index']);

/*
|--------------------------------------------------------------------------
| RUTAS PROTEGIDAS (SANCTUM)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('/admin', [AdminController::class, 'show']);
    Route::put('/admin', [AdminController::class, 'update']);

    Route::apiResource('negocios', NegocioController::class);

    Route::apiResource('tickets', TicketController::class);
    Route::get('/inventario', [InventarioController::class, 'index']);

    Route::post('/logout', [AuthController::class, 'logout']);
});

/*
|--------------------------------------------------------------------------
| SOLO ADMIN
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:sanctum', 'rol:1'])->group(function () {
    Route::get('/admin-negocios', [NegocioController::class, 'index']);
});
//INVENTARIO
Route::get('/inventario', [InventarioController::class, 'index']);
Route::get('/inventario/sincronizar', [InventarioController::class, 'sincronizar']);
/*
|--------------------------------------------------------------------------
| ROLES Y PERMISOS
|--------------------------------------------------------------------------
*/
Route::get("/roles", [RolPermisoController::class, "roles"]);
Route::get("/permisos", [RolPermisoController::class, "permisos"]);
Route::get("/roles/{id}/permisos", [RolPermisoController::class, "permisosRol"]);
Route::put("/roles/{id}/permisos", [RolPermisoController::class, "guardar"]);

/*
|--------------------------------------------------------------------------
| TARJETAS
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/tarjetas', [TarjetaClienteController::class, 'listado']);
    Route::post('/tarjetas', [TarjetaClienteController::class, 'guardar']);
    Route::delete('/tarjetas/{id}', [TarjetaClienteController::class, 'eliminar']);
});

/*
|--------------------------------------------------------------------------
| CLIENTES
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/historial', [ClienteController::class, 'historialCliente']);
    Route::get('/cliente/configuracion', [ClienteController::class, 'configuracion']);
    Route::put('/cliente/actualizar', [ClienteController::class, 'actualizar']);

    Route::get('/clientes', [ClienteController::class, 'index']);
    Route::post('/clientes', [ClienteController::class, 'store']);
});

Route::put('/clientes/{id}', [ClienteController::class, 'update']);
Route::delete('/clientes/{id}', [ClienteController::class, 'destroy']);

/*
|--------------------------------------------------------------------------
| PRODUCTOS Y MARCAS
|--------------------------------------------------------------------------
*/
Route::apiResource('productos', ProductoController::class);
Route::apiResource('marcas', MarcaController::class);

/*
|--------------------------------------------------------------------------
| TIENDA DASHBOARD
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->prefix('tienda/dashboard')->group(function () {
    Route::get('productos', [TiendaClienteDashController::class, 'productos']);
    Route::get('ingresos', [TiendaClienteDashController::class, 'ingresos']);
    Route::get('resumen', [TiendaClienteDashController::class, 'resumen']);
});

/*
|--------------------------------------------------------------------------
| TICKETS
|--------------------------------------------------------------------------
*/
Route::get('/tickets', [GenerarTicketController::class, 'index']);
Route::post('/tickets', [GenerarTicketController::class, 'store']);

/*
|--------------------------------------------------------------------------
| MOVIMIENTOS
|--------------------------------------------------------------------------
*/
Route::get('/movimientos', [MovimientoController::class, 'index']);

/*
|--------------------------------------------------------------------------
| STRIPE
|--------------------------------------------------------------------------
*/
Route::post('/create-payment', [StripeController::class, 'createPayment']);
Route::post('/save-movimiento', [StripeController::class, 'saveMovimiento']);
Route::get('/crear-cuenta-prueba', [StripeController::class, 'crearCuentaPrueba']);