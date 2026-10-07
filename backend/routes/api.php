<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\v1\Leads\{LeadController, LeadActivityController, LeadStatusController};
use Illuminate\Support\Facades\Hash;
use App\Models\User;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/v1/login', function (Illuminate\Http\Request $request) {
    $user = User::where('email', $request->email)->first();

    if (! $user || ! Hash::check($request->password, $user->password)) {
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    // Generate a Sanctum token
    $token = $user->createToken('test-token')->plainTextToken;

    return response()->json(['token' => $token]);
});

Route::prefix('v1')->middleware('auth:sanctum')->group(function () {

    // Leads
    Route::apiResource('leads', LeadController::class);

    
});
