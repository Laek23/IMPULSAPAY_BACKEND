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
use App\Http\Controllers\Api\DashboardController;

// MUEVELA AQUÍ (Fuera de cualquier Route::group o middleware)
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

   
   Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('tickets', TicketController::class);
});

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

/*
|--------------------------------------------------------------------------
| TARJETAS
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->get('/tarjetas', [TarjetaClienteController::class, 'listado']);
Route::middleware('auth:sanctum')->post('/tarjetas', [TarjetaClienteController::class, 'guardar']);
Route::middleware('auth:sanctum')->delete('/tarjetas/{id}', [TarjetaClienteController::class, 'eliminar']);
// hasgdhjasdhakjsdhask
/*
|--------------------------------------------------------------------------
| CLIENTES
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->get('/historial', [ClienteController::class, 'historialCliente']);
Route::middleware('auth:sanctum')->get('/cliente/configuracion', [ClienteController::class, 'configuracion']);
Route::middleware('auth:sanctum')->put('/cliente/actualizar', [ClienteController::class, 'actualizar']);

// CRUD clientes (temporal público)
Route::middleware('auth:sanctum')->get('/clientes', [ClienteController::class, 'index']);
Route::middleware('auth:sanctum')->post('/clientes', [ClienteController::class, 'store']);
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
| DASHBOARD TIENDA
|--------------------------------------------------------------------------
*/

//dash cliente tienda 
// ¡ESTO ES VITAL! El middleware auth:sanctum debe envolver las rutas
Route::middleware('auth:sanctum')->group(function () {
    
    Route::prefix('tienda/dashboard')->group(function () {
        Route::get('productos', [TiendaClienteDashController::class, 'productos']);
        Route::get('ingresos', [TiendaClienteDashController::class, 'ingresos']);
        Route::get('resumen', [TiendaClienteDashController::class, 'resumen']);
    });
    
});

use App\Http\Controllers\Api\GenerarTicketController;

Route::get('/tickets', [GenerarTicketController::class, 'index']);
Route::post('/tickets', [GenerarTicketController::class, 'store']);


//historial
use App\Http\Controllers\Api\MovimientoController; // Nota el "\Api\"

Route::get('/movimientos', [MovimientoController::class, 'index']);