<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserConroller extends Controller
{
    public function index()
    {
        $users = User::where(['role' => 'user'])->get();
        return response()->json($users);
    }
    public function showById($id)
    {
        $users = User::findOrFail($id);
        return response()->json($users);
    }
    public function edite(Request $request, $id)
    {
        $userValidatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|max:255',
        ]);

        $user = User::findOrFail($id);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->update();

        return response()->json(['user' => 'Your profile has been updated'], 200);
    }

    public function delete($id)
    {
        User::findOrFail($id)->delete();
        return response()->json(['message' => 'User had been deleted sucssufully']);
    }


    public function deleteImage($id)
    {
        $user = User::findOrFail($id);
        $oldImg = public_path('BooksImages/' . $user->image);
        unlink($oldImg);
        $user->image = null;
        $user->update();
        return response()->json(['user' => 'Image a ete bien suprimer']);
    }

    public function changeImage(Request $request, $id)
    {
        $request->validate([
            'image' => 'image|mimes:jpeg,png,jpg|max:4000|required',
        ]);
        if ($request->hasFile('image')) {

            $user = User::findOrFail($id);

            // if ($user->image) {
            //     $oldImg = public_path('BooksImages/' . $user->image);
            //     if (file_exists($oldImg)) {
            //         unlink($oldImg);
            //     }
            // }

            $file = $request->file('image');
            $fileName  = $file->getClientOriginalName();
            $randomNumber = str_pad(rand(0, 999999), 6, '0', STR_PAD_LEFT);
            $finalName = $user->id . '_' . now()->format('Ymd_His') . '_' . $randomNumber . '_' . $fileName;
            $file->move('BooksImages/', $finalName);
            $user->image = $finalName;
            $user->update();
            return response()->json(['message' => 'Image a ete bien modifier', 'image_url' => asset('BooksImages/' . $finalName)]);
        }
    }
}
