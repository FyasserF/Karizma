<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function index()
    {
        $books = Book::all();
        return response()->json($books);
    }

    public function showById($id)
    {
        $book = Book::find($id);
        return response()->json($book);
    }
    public function delete($id)
    {
        Book::find($id)->delete();
        return response()->json(['message' => 'book had been deleted sucssufully']);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'titre' => 'required|string|max:255',
            'autheur' => 'required|string|max:255',
            'genre' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $user = new Book();
        $user->titre = $request->titre;
        $user->autheur = $request->autheur;
        $user->genre = $request->genre;
        $user->description = $request->description;
        if ($request->hasFile('image')) {
            $validatedData = $request->validate([
                'image' => 'image|mimes:jpeg,png,jpg|max:3000|required',
            ]);
            $file = $request->file('image');
            $fileName  = $file->getClientOriginalName();
            $randomNumber = str_pad(rand(0, 999999), 6, '0', STR_PAD_LEFT);
            $finalName = $user->id . '_' . now()->format('Ymd_His') . '_' . $randomNumber . '_' . $fileName;
            $file->move('BooksImages/', $finalName);
            $user->image = $finalName;
        } else {
            $user->image = null;
        }

        $user->save();

        return response()->json(['message' => 'book had been created sucssufully']);
    }



    public function edite(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'titre' => 'required|string|max:255',
                'autheur' => 'required|string|max:255',
                'genre' => 'required|string|max:255',
                'description' => 'required|string',
            ]);

            $book = Book::findOrFail($id);

            $book->titre = $validatedData['titre'];
            $book->autheur = $validatedData['autheur'];
            $book->genre = $validatedData['genre'];
            $book->description = $validatedData['description'];

            if ($request->hasFile('image')) {
                $validatedImageData = $request->validate([
                    'image' => 'image|mimes:jpeg,png,jpg|max:3000|required',
                ]);

                $file = $request->file('image');
                $fileName = $file->getClientOriginalName();
                $randomNumber = str_pad(rand(0, 999999), 6, '0', STR_PAD_LEFT);
                $finalName = $book->id . '_' . now()->format('Ymd_His') . '_' . $randomNumber . '_' . $fileName;
                $file->move('BooksImages/', $finalName);
                $book->image = $finalName;
            }

            $book->save();

            return response()->json(['message' => 'Book has been updated successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to update book', 'error' => $e->getMessage()], 500);
        }
    }
}
