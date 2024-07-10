<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{


    public function login(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|string|max:255',
                'password' => 'required|string|min:8',
            ]);
            $user = User::where('email', $request->email)->first();

            if ($user && Hash::check($request->password, $user->password)) {
                $token = $user->createToken('AuthToken')->plainTextToken;
                
                $image = null;
                if ($user->image) {
                    $image = asset('BooksImages/' . $user->image);
                }

                return response()->json([
                    'token' => $token,
                    'user' => [
                        'id' => $user->id,
                        'role' => $user->role,
                        'name' => $user->name,
                        'image' => $image,
                    ],
                ], 200);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'User not authenticated'], 401);
        }
    }

    public function register(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|max:255',
                'role' => 'required|string|max:255',
                'password' => 'required|string|min:8',
            ]);
            if (User::where('email', $request->email)->exists()) {
                return response()->json(['message' => 'User already exists'], 409);
            }

            $validatedData['password'] = bcrypt($request->password);
            $user = new User();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->role = $request->role;
            $user->password = $validatedData['password'];
            $user->save();

            return response()->json(['message' => 'User has been created successfully'], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to create user'], 500);
        }
    }


    public function logout(Request $request)
    {

        $user = User::find($request->id);

        if ($user) {
            $user->tokens()->delete();
            return response()->json(['message' => 'Tokens revoked successfully']);
        }
        return response()->json(['message' => 'User not authenticated'], 401);
    }
}
