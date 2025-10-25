<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DiagnosticController;
use App\Http\Controllers\PartController;
use App\Http\Controllers\MechanicController;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CarouselController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Public search routes
Route::get('/parts/search', [PartController::class, 'search']);
Route::get('/mechanics/search', [MechanicController::class, 'search']);
Route::get('/vehicles/search', [VehicleController::class, 'search']);

// Public view routes
Route::get('/parts', [PartController::class, 'index']);
Route::get('/parts/{id}', [PartController::class, 'show']);
Route::get('/mechanics', [MechanicController::class, 'index']);
Route::get('/mechanics/{id}', [MechanicController::class, 'show']);
Route::get('/vehicles', [VehicleController::class, 'index']);
Route::get('/vehicles/{id}', [VehicleController::class, 'show']);

// Carousel/Homepage slides
Route::get('/carousel-images', [CarouselController::class, 'index']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    
    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    
    // Diagnostics
    Route::post('/diagnose', [DiagnosticController::class, 'diagnose']);
    Route::get('/diagnostics/history', [DiagnosticController::class, 'history']);
    Route::get('/diagnostics/{id}', [DiagnosticController::class, 'show']);
    Route::post('/diagnostics/{id}/feedback', [DiagnosticController::class, 'feedback']);
    Route::get('/diagnostics/statistics', [DiagnosticController::class, 'statistics']);
    
    // Parts management (for sellers)
    Route::post('/parts', [PartController::class, 'store']);
    Route::put('/parts/{id}', [PartController::class, 'update']);
    Route::delete('/parts/{id}', [PartController::class, 'destroy']);
    
    // Mechanics management
    Route::post('/mechanics', [MechanicController::class, 'store']);
    Route::put('/mechanics/{id}', [MechanicController::class, 'update']);
    Route::delete('/mechanics/{id}', [MechanicController::class, 'destroy']);
    Route::post('/mechanics/{id}/book', [MechanicController::class, 'book']);
    
    // Vehicles management (for sellers)
    Route::post('/vehicles', [VehicleController::class, 'store']);
    Route::put('/vehicles/{id}', [VehicleController::class, 'update']);
    Route::delete('/vehicles/{id}', [VehicleController::class, 'destroy']);
    Route::post('/vehicles/{id}/contact', [VehicleController::class, 'contact']);
    
    // Reviews
    Route::post('/parts/{id}/review', [PartController::class, 'review']);
    Route::post('/mechanics/{id}/review', [MechanicController::class, 'review']);
    Route::post('/vehicles/{id}/review', [VehicleController::class, 'review']);
    
    // Carousel management (admin only - add role middleware if needed)
    Route::post('/carousel', [CarouselController::class, 'store']);
    Route::put('/carousel/{id}', [CarouselController::class, 'update']);
    Route::delete('/carousel/{id}', [CarouselController::class, 'destroy']);
});

// Health check
Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now(),
        'version' => '1.0.0'
    ]);
});
