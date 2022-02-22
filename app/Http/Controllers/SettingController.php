<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Hash;
use App\Models\DanI;
use App\Models\UserDanI;

class SettingController extends Controller
{
    public function index() {
        return view('setting', [
            'dan_i' => DanI::all(),
            'my_dan_i' => UserDanI::myDanI()->first()
        ]);
    }

    public function update(Request $request) {
        $userId = Auth::user()->id;
        $rules = [
            'name' => ['required','string'],
            'email' => ['required', 'email', "unique:users,email,$userId,id"],
            'iidxid' => ['nullable', 'string', 'size:8', 'regex:/[0-9]*/', "unique:users,iidxid,$userId,id"],
            'dan_i' => ['nullable'],
        ];

        if ($request->has('change-password')) {
            $rules += [
                'password' => ['required', 'string', 'min:8', 'confirmed'],
            ];
        }

        $this->validate($request, $rules);

        $user = Auth::user();
        $user->fill([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'iidxid' => $request->input('iidxid'),
            'password' => Hash::make($request->input('password'))
        ]);
        $user->save();

        if ($request->filled('dan_i')) {
            $myDanI = new UserDanI;

            $myDanI->fill([
                'user_id' => $user->id,
                'dan_i_id' => $request->input('dan_i')
            ]);

            $myDanI->save();
        }

        return redirect('setting')->with(['successmsg' => '変更が完了しました。']);
    }
}
