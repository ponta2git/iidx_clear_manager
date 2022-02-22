@extends('layouts.app')

@section('content')

<div id="login-form" class="box">
    <div class="box-content">
        @error('loginerror')
            <p class="errormsg">{{ $message }}</p>
        @enderror
        <form action="{{ route('login') }}" method="POST" id="login-form" name="login-form">
            @csrf
            <div class="form-group">
                <div class="input-info"><label for="email">メールアドレス</label></div>
                <input type="text" id="email" name="email" value="{{ old('email') }}" @error('email') class="error" @enderror>
                @error('email')
                <p class="errormsg">{{ $message }}</p>
                @enderror
            </div>
            <div class="form-group">
                <div class="input-info"><label for="password">パスワード</label></div>
                <input type="password" id="password" name="password" value="{{ old('password') }}" @error('password') class="error" @enderror>
                @error('password')
                <p class="errormsg">{{ $message }}</p>
                @enderror
            </div>
            <div class="form-buttons">
                <button type="submit" class="btn-ok">ログイン</button>
            </div>
        </form>
    </div>
</div>
@endsection