<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\UserConroller;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);

Route::middleware(['auth:sanctum'])->group(function () {
    //!-- books crud
    Route::get('/books', [BookController::class, 'index']);
    Route::get('/books/{id}', [BookController::class, 'showById']);
    Route::post('/books/add', [BookController::class, 'store']);
    Route::put('/books/edite/{id}', [BookController::class, 'edite']);
    Route::delete('/books/{id}', [BookController::class, 'delete']);

    //!-- users crud
    Route::get('/users', [UserConroller::class, 'index']);
    Route::get('/users/{id}', [UserConroller::class, 'showById']);
    Route::put('/users/{id}', [UserConroller::class, 'edite']);
    Route::delete('/users/{id}', [UserConroller::class, 'delete']);
    Route::post('deleteImage/{id}', [UserConroller::class, 'deleteImage']);
    Route::post('changeImage/{id}', [UserConroller::class, 'changeImage']);


    Route::post('logout', [AuthController::class, 'logout']);
});
